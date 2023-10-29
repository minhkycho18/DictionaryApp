import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import tw from "twrnc";

import ItemSubCategory from "~/components/Home/WordList/ItemSubCategory/ItemSubCategory";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { svgstudy } from "~/constants/theme";

export default function YourWordlistDetail() {
  // const [subCategories, setSubCategories] = useState([]);
  const navigation = useNavigation();
  // const data = useRoute();
  // const getMyWordList = async () => {
    // const data = await getWordListById();
    // setSubCategories(data);
  // };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const remoteItems = [
    { id: 1, title: "Item 1", val: "item-1" },
    { id: 2, title: "Item 2", val: "item-2" },
  ];
  const arr = [
    { id: 1 },
    { id: 2 },


  ];
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
              Free Wordlist
            </Text>
            {/* Description */}
            <Text
              style={[
                tw`pl-2 mt-1 font-normal  tracking-wider text-lg`,
                { color: "#182B40" },
              ]}
            >
              Free Wordlist
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
            }}
            showsVerticalScrollIndicator={false}
            data={arr} //subCategories
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemSubCategory />}
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
    width: "88%",
    marginTop: 12,
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
