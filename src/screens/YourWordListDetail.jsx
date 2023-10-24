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

export default function YourWordlistDetail() {
  const navigation = useNavigation();
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
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
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

        <View style={{ marginLeft: 40 }}>
          <Text
            style={[
              tw`pl-2 mt-1 font-bold  tracking-wider text-3xl italic`,
              { color: "#182B40" },
            ]}
          >
            Free Wordlist
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.dropdown}>
          {/* <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
              marginTop: 35,
            }}
          >
            {arr.map((item) => (
              <ItemSubCategory key={item.id} />
            ))}
          </ScrollView> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={arr}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemSubCategory />}
          />
        </View>
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
    height: 130,
    // borderBottomRightRadius: 60,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FAFAFA",
    backgroundColor: "#AAAAAA",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  dropdown: {
    width: "88%",
    marginTop: 10,
    // marginTop: 60,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
