import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { SlideInUp } from "react-native-reanimated";
import ItemListVocabOfSub from "../ItemListVocabOfSub/ItemListVocabOfSub";
import ItemAddNewWord from "../ItemAddNewWord/ItemAddNewWord";

export default function ItemSubCategory({ subcategory }) {
  const [title, setTitle] = useState(subcategory.title);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const navigation = useNavigation();
  const handleAddWordToSub = () => {
    navigation.navigate("AddWordToSub", {
      wordlistId: "1",
      subcategoryId: "1",
    });
  };
  return (
    //item sub
    <View>
      {/* View combobox */}
      <View style={{ marginTop: 15 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            backgroundColor: "#FEFEFE",
            borderWidth: 0,
            height: 55,
            borderRadius: 15,
            // marginHorizontal: 5,
          }}
          textStyle={{
            fontSize: 16,
          }}
          // placeholder="Sub Category"
          placeholder={title}
          placeholderStyle={{
            color: "#462D4E",
            fontWeight: "bold",
          }}
          showTickIcon={false}
          dropDownContainerStyle={{
            backgroundColor: "#1ead31",
            height: 0,
            borderWidth: 0,
          }}
          arrowIconStyle={{
            width: 22,
            height: 22,
          }}
        />
        <Animated.View>
          {open && <ItemAddNewWord onAddWordToSub={handleAddWordToSub} />}
          {open && <ItemListVocabOfSub subcategory={subcategory} />}
        </Animated.View>
      </View>

      {/* View list word of subcategory */}
    </View>
  );
}
