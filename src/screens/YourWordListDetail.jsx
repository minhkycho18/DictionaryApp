import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";
import Toast, { ErrorToast } from "react-native-toast-message";
import ItemSubCategory from "~/components/Home/WordList/ItemSubCategory/ItemSubCategory";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { svgstudy } from "~/constants/theme";
import { deleteSubCategory, getAllSubCategory } from "~/api/Subcategory";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function YourWordlistDetail() {
  const {
    params: { Wordlist },
  } = useRoute();
  const wl = Wordlist;

  const [subCategories, setSubCategories] = useState([]);
  const navigation = useNavigation();
  const getSubCategory = async (id) => {
    const data = await getAllSubCategory(id);
    console.log("\ntest", "data abc");
    console.log(data);

    setSubCategories(data);
  };

  const handleDelete = async (idWL, idSub) => {
    try {
      await deleteSubCategory(idWL, idSub);
      const newSubCategoties = subCategories.filter((item) => item.subcategoryId !== idSub);
      setSubCategories(newSubCategoties);
      showToast(
        "Success",
        "Delete Sub Category success!"
      );
      console.log("Delete Sub Category success!")

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
  useEffect(() => {
    getSubCategory(wl.item.id);
  }, []);
  useEffect(() => {
    console.log(`TEST ::`, subCategories);
  }, [subCategories]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginTop: 10, marginLeft: 13 }}>
          <Entypo
            name="chevron-left"
            size={24}
            color="#182B40"
            onPress={() => {
              navigation.push("YourWordlist");
            }}
          />
        </TouchableOpacity>

        <View style={{
          marginLeft: 40,
          display: 'flex',
          flexDirection: 'row',
          // alignItems: 'center',
          // position: 'relative',
        }}>
          <Image
            source={require("~/assets/wordlist.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 40,
              // top: -10
            }}
          />
          <View>
            {/* Title */}
            <Text
              style={[
                tw`pl-2 mt-1 font-bold  tracking-wider text-3xl`,
                { color: "#182B40" },
              ]}
            >
              {wl.item.title}
            </Text>
            {/* Description */}
            <Text
              style={[
                tw`pl-2 mt-1 font-normal  tracking-wider text-lg`,
                { color: "#182B40" },
              ]}
            >
              {wl.item.listDesc}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Button Study */}
        <TouchableOpacity style={styles.ButtonStudy}>
          <SvgXml width="30" height="30" xml={svgstudy} />
          <Text
            style={[
              tw`pl-2 mt-1 font-normal  tracking-wider text-base `,
              { color: "#FFF7FF" },
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
                  onDelete = {handleDelete}
                />
              </GestureHandlerRootView>

            )}
          />
        </View>


        {/* Add new Subcategory */}
        <TouchableOpacity style={styles.ButtonAdd}>
          <Ionicons
            name="add"
            size={27}
            color="#3C2D4E"
          // backgroundColor="#BBBBBB"
          />
          <Text
            style={[
              tw`pl-2 mt-1 font-normal  tracking-wider text-base `,
              { color: "#3C2D4E" },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
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
    display: 'flex',
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
  },
  ButtonStudy: {
    backgroundColor: "#3D3A4D",
    borderRadius: 18,
    position: "absolute",
    right: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: 'row',
    top: '-4.5%',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 35,
    paddingRight: 35,
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
    flexDirection: 'row',
    top: '4.5%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    top: "88%",
    // bottom: 20,
    right: "6.5%",
  }
});
