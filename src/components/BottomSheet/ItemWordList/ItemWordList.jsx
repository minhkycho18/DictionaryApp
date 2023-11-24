import React, { useState, useEffect, useCallback } from "react";
import { Animated, TouchableOpacity, Text, Image } from "react-native";
import { View } from "react-native";
import tw from "twrnc";
import DropDownPicker from "react-native-dropdown-picker";
import Toast, { ErrorToast } from "react-native-toast-message";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import {
  addWordDefaultToSub,
  getAllSubCategory,
  getAllWordOfSub,
} from "~/api/Subcategory";
import { Styles } from "./Styles";
import { useFocusEffect } from "@react-navigation/native";
export default function ItemWordlist({
  onAddSub,
  wordlist,
  data,
  onAddWordToSub,
  onError,
  sub,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [subs, setSubs] = useState([]);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const getSubById = async (id) => {
    try {
      const result = await getAllSubCategory(id);
      setSubs(result);
    } catch (error) {
      console.error("Error while fetching data:", error);
      // Handle the error here
    }
  };
  useEffect(() => {
    getSubById(wordlist.id);
  }, []);
  useEffect(() => {
    if (Object.keys(sub).length !== 0) {
      if (sub.wordListId === wordlist.id) {
        setSubs([...subs, sub]);
      }
    }
  }, [sub]);

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  const addWordToSub = async (wordlistId, subId, limit, data) => {
    try {
      const words = await getAllWordOfSub(wordlistId, subId, limit);
      const check = words.content.find(
        (item) => item.definition.defId === data.defId
      )
        ? true
        : false;
      if (check) {
        const sub = subs.find((item) => item.subcategoryId === subId);
        onError("Error", `the vocabulary is exist in ${sub.title}`);
      } else {
        await addWordDefaultToSub(wordlistId, subId, data);
        onAddWordToSub({ state: true, defId: data.defId });
      }
      // const result = await addWordDefaultToSub(wordlistId, subId, data);
      // onAddWordToSub({ state: true, defId: data.defId });
      // console.log(`Add word ::`, result);
    } catch (error) {
      console.log(`Add word to sub ::`, error);
    }
  };

  return (
    //item sub

    <View style={{ marginTop: 5, marginBottom: 10 }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={Styles.dropDownPicker}
        textStyle={{
          fontSize: 16,
        }}
        placeholder={wordlist.title}
        placeholderStyle={{
          color: colors.textTitle,
          fontFamily: "Quicksand-SemiBold",
          fontSize: 18,
        }}
        showTickIcon={false}
        dropDownContainerStyle={Styles.dropDownContainerStyle}
        arrowIconStyle={Styles.arrowIconStyle}
        listMode="SCROLLVIEW"
      />
      <Animated.View>
        {open && (
          <View>
            {subs.map((item, index) => (
              <TouchableOpacity
                style={[tw`bg-stone-100`, Styles.wrappered]}
                key={index}
                onPress={() =>
                  addWordToSub(
                    wordlist.id,
                    item.subcategoryId,
                    item.amountOfWord === 0 ? 20 : item.amountOfWord,
                    data
                  )
                }
              >
                <View style={Styles.Text_content}>
                  <Text
                    style={{
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 17,
                      color: "#182B40",
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <View>
              <TouchableOpacity
                onPress={() => {
                  onAddSub(wordlist.id), setOpen(!open);
                }}
              >
                <View style={[tw`bg-stone-100`, Styles.viewAdd]}>
                  <Image
                    source={require("~/assets/btn_add.png")}
                    style={Styles.Image}
                  ></Image>
                  <View style={Styles.Title_Add}>
                    <Text
                      numberOfLines={1}
                      style={[
                        tw`tracking-wide text-base`,
                        { color: "#182B40", fontFamily: "Quicksand-Medium" },
                      ]}
                    >
                      Create Subcategory
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
}
