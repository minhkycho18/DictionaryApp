import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { checkLogin } from "~/helper/Auth";
import Modal from "react-native-modal";
import { colors } from "~/constants/theme";
import { cloneSubcategory, getAllSubCategory } from "~/api/Subcategory";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import ItemSubCategoryOfPublicSub from "~/components/Home/WordList/ItemSubCategoryOfPublicSub/ItemSubCategoryOfPublicSub";
import { getWordListById } from "~/api/WordList";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import FormAdd from "~/components/BottomSheet/FormAdd/FormAdd";
import ItemWordlist from "~/components/PublicWordlist/ItemWordList/ItemWordList";
import ItemAddNewWordlist from "~/components/BottomSheet/ItemAddWordlist/ItemAddWordlist";
import { delay } from "~/helper";
export default function PublicWordlistDetail() {
  const { params } = useRoute();

  const wl = params.Wordlist;
  const type = params.type;
  const [subCategories, setSubCategories] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  ///modal
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModaAdd, setIsOpenModaAdd] = useState(false);
  const [wordlists, setWordlists] = useState([]);
  const [newSub, setNewSub] = useState({});
  const [isWordList, setIsWordList] = useState(true);
  const [sourceSubId, setSourceSubId] = useState("");
  const [wordlistId, setWordlistId] = useState("");
  ///end
  const navigation = useNavigation();

  const getSubCategory = async (id) => {
    const data = await getAllSubCategory(id);
    setSubCategories(data);
  };

  useEffect(() => {
    getSubCategory(wl.id);
    const checkToken = async () => {
      const check = await checkLogin();
      setIsLogin(check);
    };

    checkToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getSubCategory(wl.id);
    }, [])
  );
  /// Modal
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 1300,
      autoHide: true,
      topOffset: 50,
      // zIndex: 1000,
    });
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

  const handlePresentModal = (sourceSubId) => {
    if (!isLogin) {
      showToast("Error", "Please login to add", "error");
    } else {
      setSourceSubId(sourceSubId);
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const getMyWordList = async () => {
      const result = await getWordListById();
      setWordlists(result);
    };
    if (isOpen) {
      getMyWordList();
      // console.log("huy");
    }
  }, [isOpen]);

  const handlePresentModalAdd = () => {
    setIsWordList(true);
    setIsOpenModaAdd(true);
  };

  const handleCloneSubToWordlist = async (wordlistId, targetSubId) => {
    try {
      const res = await cloneSubcategory(wordlistId, sourceSubId, targetSubId);
      console.log(res);
      showToast(
        "Success",
        "Clone subcategory to wordlist successfully",
        "success"
      );
      await delay(1400);
      setIsOpen(false);
    } catch (error) {
      showToast("Error", "Clone subcategory to wordlist fail", "error");
    }
  };

  const handleAddSub = (wordlistId) => {
    setWordlistId(wordlistId);
    setIsWordList(false);
    setIsOpenModaAdd(!isOpenModaAdd);
    // setIsOpen(false);
  };

  const handleCloseModalAdd = async () => {
    setIsOpenModaAdd(false);
    await delay(200);
    // setIsOpen(!isOpen);
  };

  const create_success = async (res, type) => {
    if (type) {
      showToast("Success", "Create new wordlist successfully", "success");
      await delay(1000);
    } else {
      showToast("Success", "Create new subcategory successfully", "success");
      await delay(1000);
      setNewSub(res);
    }
    setIsOpenModaAdd(false);
    setIsOpen(false);
    delay(400);
    setIsOpen(true);
  };

  ///end
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  const handleBack = async () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={["#EDEDED", "#fff"]}
      style={{ flex: 1 }}
      // style={tw`pt-1.5 pr-2 pl-2 pb-2   bg-stone-50`}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
              width: "100%",
              height: 320,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                width: "100%",
                height: "70%",
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  width: 40,
                  height: 40,
                  left: 10,
                  top: "-40%",
                  zIndex: 1000,
                  padding: 5,
                }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="close-sharp"
                  size={30}
                  color={colors.textColor}
                />
              </TouchableOpacity>

              <View style={styles.viewImage}>
                <View
                  style={{
                    ...styles.Image,
                    borderLeftColor: type === "public" ? "#BFD8C3" : "#A3D5D8",
                  }}
                >
                  <Image
                    source={
                      type === "public"
                        ? require("~/assets/communication.png")
                        : require("~/assets/default.png")
                    }
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={{ top: "-15%" }}>
                {/* Title */}
                <Text
                  style={[
                    {
                      color: colors.textTitle,
                      fontFamily: "Quicksand-Bold",
                      fontSize: 20,
                      letterSpacing: 0.2,
                      marginTop: -10,
                    },
                  ]}
                >
                  {wl.title}
                </Text>
              </View>
              <View style={{ top: "-13%", width: "90%" }}>
                {/* Description */}
                <Text
                  numberOfLines={2}
                  style={[
                    {
                      color: colors.gray,
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 16,
                      letterSpacing: 0.1,
                      textAlign: "center",
                    },
                  ]}
                >
                  {wl.listDesc}
                </Text>
              </View>
            </View>
          </View>

          {subCategories.map((item) => (
            <ItemSubCategoryOfPublicSub
              key={item.subcategoryId}
              subcategory={item}
              onPresentModal={handlePresentModal}
            />
          ))}
        </ScrollView>
      </SafeAreaView>

      <Modal
        onBackdropPress={() => setIsOpen(false)}
        onBackButtonPress={() => setIsOpen(false)}
        isVisible={isOpen}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={1000}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        useNativeDriver={false}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.viewBottomSheet}>
            <Text style={styles.headerBottomSheet}>Clone to your wordlist</Text>
            <View style={styles.scrollBottom}>
              <ScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
                style={{ marginBottom: 10 }}
                showsVerticalScrollIndicator={false}
              >
                {wordlists.map((item) => (
                  <ItemWordlist
                    onAddSub={handleAddSub}
                    key={item.id}
                    wordlist={item}
                    // data={dataUpdate}
                    onClone={handleCloneSubToWordlist}
                    sub={newSub}
                  />
                ))}

                <ItemAddNewWordlist onAddWordList={handlePresentModalAdd} />
              </ScrollView>
            </View>
          </View>
          {isOpenModaAdd && (
            <View>
              <Modal
                onBackdropPress={() => {
                  setIsOpenModaAdd(false);
                  setIsOpen(true);
                }}
                onBackButtonPress={() => setIsOpenModaAdd(false)}
                isVisible={isOpenModaAdd}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                useNativeDriver={true}
                style={{ ...styles.modal, zIndex: 1000 }}
                onModalShow={() => {}}
              >
                <View style={styles.modalContent}>
                  <View style={styles.viewBottomSheet}>
                    <FormAdd
                      isAddWordlist={isWordList}
                      onCancel={handleCloseModalAdd}
                      onCreate={create_success}
                      wordlistId={wordlistId}
                      onError={(text1, text2) =>
                        showToast(text1, text2, "error")
                      }
                    />
                  </View>
                </View>
                <Toast
                  config={toastConfig}
                  refs={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </Modal>
            </View>
          )}
        </View>
        {!isOpenModaAdd && (
          <Toast
            config={toastConfig}
            refs={(ref) => {
              Toast.setRef(ref);
            }}
          />
        )}
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    backgroundColor: "#EDEDED",
    // marginBottom: 10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  dropdown: {
    display: "flex",
    width: "100%",
    marginTop: 50,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
  },

  viewImage: {
    alignItems: "center",
    position: "relative",
  },
  Image: {
    top: "-30%",
    width: 135,
    height: 200,
    backgroundColor: "#fff",
    borderLeftWidth: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
    borderRadius: 10,

    display: "flex",
    alignItems: "center",
    // marginTop: 20,
  },
  image: {
    top: 10,
    marginTop: 10,
    width: "90%",
    height: "68%",
  },
  viewBottomSheet: {
    marginHorizontal: 20,
  },
  headerBottomSheet: {
    fontSize: 23,
    fontFamily: "Quicksand-Bold",
    color: colors.textTitle,
    marginBottom: 10,
    textAlign: "center",
  },
  scrollBottom: {
    height: "90%",
    marginTop: 10,
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
    height: "70%",
  },
});
