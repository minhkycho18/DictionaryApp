import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import Toast, { ErrorToast } from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

import ItemSubCategory from "~/components/Home/WordList/ItemSubCategory/ItemSubCategory";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { colors, svgstudy } from "~/constants/theme";
import { deleteSubCategory, getAllSubCategory } from "~/api/Subcategory";
import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ListVocalContext } from "~/context/ListVocal";
import Modal from "react-native-modal";
import FormAdd from "~/components/BottomSheet/FormAdd/FormAdd";
import { delay } from "~/helper/index";

export default function YourWordlistDetail() {
  const { params } = useRoute();
  const wl = params.Wordlist;

  const [subCategories, setSubCategories] = useState([]);
  const [isDisplayDel, setIsDisplayDel] = useState(false);
  const [delSucess, setdelSucess] = useState(false);
  const [isOpenModaAdd, setIsOpenModaAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigation = useNavigation();

  const { deleteWord, setVocalSelect } = useContext(ListVocalContext);
  const getSubCategory = async (id) => {
    const data = await getAllSubCategory(id);
    setSubCategories(data);
  };
  const handleStudy = () => {
    navigation.navigate("StudySub", { wordlist: wl });
  };

  const handleDelete = async (idWL, idSub) => {
    try {
      await deleteSubCategory(idWL, idSub);
      const newSubCategoties = subCategories.filter(
        (item) => item.subcategoryId !== idSub
      );
      setSubCategories(newSubCategoties);
      showToast("Success", "Delete Sub Category success!");
      console.log("Delete Sub Category success!");
    } catch (error) {
      console.log(error);
    }
  };
  //Toast
  const showToast = (text1, text2) => {
    Toast.show({
      position: "top",
      type: "error",
      text1: text1,
      text2: text2,
      // text1: "Login Fail",
      // text2: "Invalid Email or Password, please try again!",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 55,
    });
  };
  const handleDeleteWord = async () => {
    try {
      deleteWord(wl.id);
      setIsDisplayDel(false);
      setdelSucess(!delSucess);
    } catch (error) {
      console.log(`Delete Error ::`, error);
    }
  };
  const handleDisplayButtonDel = () => {
    setIsDisplayDel(!isDisplayDel);
  };

  useEffect(() => {
    getSubCategory(wl.id);
    setVocalSelect([]);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // console.log("huy");
      getSubCategory(wl.id);
    }, [])
  );
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  const handleModalAdd = () => {
    // setIsWordList(true);
    // setIsOpen(false);
    setIsOpenModaAdd(!isOpenModaAdd);
  };
  const handleCloseModalAdd = () => {
    setIsOpenModaAdd(false);
    delay(1000);
    
  };

  const handleCreateCloseModalAdd= async () => {
    handleCloseModalAdd();
    
    try {
      setSubCategories([]);
      getSubCategory(wl.id);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: 10, marginLeft: 13 }}>
          <Entypo
            name="chevron-left"
            size={24}
            color="#182B40"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 40,
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            // alignItems: 'center',
            // position: 'relative',
          }}
        >
          <Image
            source={require("~/assets/wordlist.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              // top: -10
            }}
          />

          <View style={{ marginLeft: 10 }}>
            {/* Title */}
            <Text
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  fontSize: 32,
                  letterSpacing: 0.2,
                  marginTop: -10,
                },
              ]}
            >
              {wl.title}
            </Text>
            {/* Description */}
            <Text
              numberOfLines={2}
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 16,
                  letterSpacing: 0.1,
                },
              ]}
            >
              {wl.listDesc}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Button Study */}
        <TouchableOpacity
          style={styles.ButtonStudy}
          onPress={() => handleStudy()}
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

        {/* List Subcategory */}
        <View style={styles.dropdown}>
          <FlatList
            style={{
              marginTop: 10,
              padding: 3,
              // marginBottom: 15,
            }}
            showsVerticalScrollIndicator={false}
            data={subCategories} //subCategories.subcategoryId
            keyExtractor={(item) => item.subcategoryId}
            renderItem={({ item }) => (
              <GestureHandlerRootView>
                <ItemSubCategory
                  subcategory={item}
                  onDelete={handleDelete}
                  onDisplayButtonDel={handleDisplayButtonDel}
                  delSucess={delSucess}
                  isDisplayDel={isDisplayDel}
                />
              </GestureHandlerRootView>
            )}
          />
        </View>

        {/* Add new Subcategory */}
        {!isDisplayDel && (
          <TouchableOpacity style={styles.ButtonAdd} onPress={handleModalAdd}>
            <Ionicons
              name="add"
              size={27}
              color={colors.textTitle}
              // backgroundColor="#BBBBBB"
            />
            <Text
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  fontSize: 15,
                },
              ]}
            >
              Add
            </Text>
          </TouchableOpacity>
        )}

        {isDisplayDel && (
          <TouchableOpacity
            style={{ ...styles.ButtonDelete }}
            onPress={handleDeleteWord}
          >
            <MaterialIcons name="delete-forever" size={27} color="white" />
            <Text
              style={[
                {
                  color: "#ffff",
                  fontFamily: "Quicksand-Bold",
                  fontSize: 15,
                },
              ]}
            >
              Delete
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        onBackdropPress={() => {
          setIsOpenModaAdd(false);
          setIsOpen(true);
        }}
        onBackButtonPress={() => setIsOpenModaAdd(false)}
        isVisible={isOpenModaAdd}
        // onSwipeComplete={handlePresentModalAdd}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.viewBottomSheet}>
            <FormAdd
              isAddWordlist={false}
              onCancel={handleCloseModalAdd}
              onCreate={handleCreateCloseModalAdd}
              wordlistId={wl.id}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#CFC5EA",
  },
  header: {
    backgroundColor: "#CFC5EA",
    width: "80%",
    height: "22%",
    // borderBottomRightRadius: 60,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    // backgroundColor: "#AAAAAA",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  dropdown: {
    display: "flex",
    width: "88%",
    marginTop: 12,
    // marginBottom: 12,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    marginBottom: 20,
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
    top: "-3.5%",
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
    right: "6.6%",
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
});
