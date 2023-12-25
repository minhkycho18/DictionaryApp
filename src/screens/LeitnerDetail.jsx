import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { SvgXml } from "react-native-svg";
import { colors, svgstudy } from "~/constants/theme";
import ItemVocabOfLeitner from "~/components/Leitner/ItemVocabOfLeitner/ItemVocabOfLeitner";
import {
  UpVocabLeitner,
  getSumOfVocabOfLeitnerLevel,
  getVocabOfLeitnerLevelOfUser,
} from "~/api/Leitner";
import SplashScreen from "~/components/SplashScreen";
import { Ionicons } from "@expo/vector-icons";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import AppLoader from "~/components/AppLoader";
import { delay, getIdValueInArr } from "~/helper";

export default function LeitnerDetail(props) {
  const level = props.route.params.level;
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const [listVocabOfLeitner, setListVocabOfLeitner] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [offset, setOffset] = useState(6);
  const [isCheck, setIsCheck] = useState(false);

  const [listWordAdd, setListWordAdd] = useState([]);
  const [countWord, setcountWord] = useState(0);
  const [btnAdd, setBtnAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getVocabOfLeitnerLevel = async (level) => {
    const data = await getVocabOfLeitnerLevelOfUser(level);
    setTotal(data.totalElements);
    setListVocabOfLeitner(data.content);
    setIsCheck(true);
  };
  const handleStudy = () => {
    navigation.push("FlashcardLeitnerScreen", { level: level });
  };

  useFocusEffect(
    useCallback(() => {
      getVocabOfLeitnerLevel(level);
    }, [])
  );
  useEffect(() => {
    // console.log('\ntes count:', countWord);
    // console.log(listWordAdd);
    if (countWord !== 0) {
      setBtnAdd(true);
    }
  }, [countWord]);

  useEffect(() => {
    getVocabOfLeitnerLevel(level);
  }, []);
  const handleEndReach = async () => {
    if (listVocabOfLeitner.length > 5) {
      try {
        setShowLoader(true);
        const data = await getVocabOfLeitnerLevelOfUser(level, offset);
        if (data.content.length > 0) {
          setListVocabOfLeitner([...listVocabOfLeitner, ...data.content]);
        }

        setOffset(offset + 6);
        setShowLoader(false);
      } catch (error) {
        console.log(`error ::`, error);
      }
    }
  };
  const handleAddWord = async (obj) => {
    setListWordAdd((pre) => [...pre, obj.vocab]);
    setcountWord((pre) => pre + 1);
  };
  const handleRemoveWord = async (obj) => {
    // console.log('tes remove: ', obj.vocab)
    const data = listWordAdd.filter((item) => item !== obj.vocab);
    setListWordAdd(data);
    // setcountWord(listWordAdd.length);
    setcountWord((pre) => pre - 1);
  };

  const handleDeleteVocal = (vocalId, defId) => {
    const listVocabFilter = listVocabOfLeitner.filter(
      (item) => defId !== item.definition.defId
    );

    setListVocabOfLeitner(listVocabFilter);
  };

  const handleStartToLearn = async (obj) => {
    const create = async () => {
      try {
        const newArray = listWordAdd.map((item) => ({
          vocabId: item.vocabId,
          defId: item.definition.defId,
        }));

        console.log(newArray);
        setIsLoading(true);
        const res = await UpVocabLeitner("up", {
          level: level,
          leitnerIds: newArray,
        });
        console.log("\nresponse: ", res);
        setIsLoading(false);
        showToast("Success", "Create new wordlist successfully", "success");
        await delay(1500);

        // navigation.goBack();

        navigation.push("LeitnerDetail", {
          level: 1,
          needStudy: true,
        });
      } catch (error) {
        setIsLoading(false);
        console.log("error: ", error);

        showToast("Error", error, "error");
      }
    };
    create();
  };
  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 1300,
      autoHide: true,
      topOffset: 60,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            marginLeft: 13,
            paddingBottom: 10,
          }}
        >
          <Entypo
            name="chevron-left"
            size={24}
            color="#182B40"
            onPress={() => {
              navigation.navigate("HomeLeitner");
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View>
            {/* Title */}
            <Text
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  fontSize: 28,
                  letterSpacing: 0.2,
                  marginTop: -10,
                },
              ]}
            >
              Leitner box Pending
            </Text>
            {/* Description */}

            <Text
              style={[
                {
                  marginTop: 10,
                  color: colors.gray,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 18,
                  letterSpacing: 0.1,
                },
              ]}
            >
              {total <= 1 ? `${total} word` : `${total} words`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Button Study */}
        {level !== "0" && (
          <TouchableOpacity
            style={{
              ...styles.ButtonStudy,
              opacity: !props.route.params.needStudy ? 0.4 : 1,
            }}
            onPress={() => handleStudy()}
            disabled={!props.route.params.needStudy}
          >
            <SvgXml width="30" height="30" xml={svgstudy} />
            <Text
              style={[
                {
                  color: "#FFF7FF",
                  fontFamily: "Quicksand-SemiBold",
                  marginLeft: 5,
                  fontSize: 15,
                },
              ]}
            >
              Study
            </Text>
          </TouchableOpacity>
        )}

        {listVocabOfLeitner.length > 0 ? (
          <FlatList
            style={{
              padding: 3,
            }}
            showsVerticalScrollIndicator={false}
            data={listVocabOfLeitner}
            keyExtractor={(item) => item.definition.defId}
            renderItem={(item) => (
              <ItemVocabOfLeitner
                Vocab={item}
                onAddWord={(vocab) => handleAddWord(vocab)}
                onRemoveWord={(vocab) => handleRemoveWord(vocab)}
                onDeleteVocal={(vocalId, defId) =>
                  handleDeleteVocal(vocalId, defId)
                }
              />
            )}
            onEndReached={handleEndReach}
            ListFooterComponent={showLoader && <SplashScreen />}
          />
        ) : (
          isCheck && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60%",
              }}
            >
              <Image
                source={require("~/assets/empty.png")}
                style={{ width: 200, height: 120 }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 18,
                  color: colors.textTitle,
                }}
              >
                You don't have any words
              </Text>
            </View>
          )
        )}

        {countWord !== 0 && (
          <TouchableOpacity
            style={styles.viewButtonReturn}
            onPress={() => {
              console.log("test vocab1:  ", listWordAdd);
              handleStartToLearn();
            }}
          >
            <View style={styles.buttonReturn}>
              <Ionicons name="return-up-back" size={24} color="#fff" />
              <Text
                style={{
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 16,
                  marginLeft: 4,
                  color: "#fff",
                  marginTop: 2,
                }}
              >
                Start to learn ( {countWord} )
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <Toast
        config={toastConfig}
        refs={(ref) => {
          Toast.setRef(ref);
        }}
      />
      {isLoading ? <AppLoader /> : ""}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#F2F5FE",
  },
  header: {
    backgroundColor: "#F2F5FE",
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  ButtonStudy: {
    backgroundColor: "#3D3A4D",
    borderRadius: 18,
    position: "absolute",
    right: "6.6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    top: "-9.5%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,

    // marginRight: 1
  },
  ButtonAdd: {
    // display: "flex",
    backgroundColor: "#D0C6EB",
    borderRadius: 25,
    position: "absolute",
    // right: 25,
    // top: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    top: "90%",
    // bottom: 20,
    right: "3.6%",
  },
  ButtonDelete: {
    // display: "flex",
    backgroundColor: "rgb(225 29 72)",
    borderRadius: 25,
    position: "absolute",
    // right: 25,
    // top: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    top: "91%",
    left: "50%",
    transform: [{ translateX: -50 }],
    textAlign: "center",
  },
  viewBottomSheet: {
    marginHorizontal: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "77%",
  },
  viewButtonReturn: {
    backgroundColor: "#2C94E6",
    position: "absolute",
    borderRadius: 20,
    right: 20,
    bottom: 20,
  },
  buttonReturn: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 8,
  },
});
