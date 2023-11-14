import React, { useEffect, useRef, useState, useContext } from "react";
import { Animated, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { Styles } from "./Styles";

import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { getAllVocabOfSubCategory } from "~/api/Subcategory";
import { ListVocalContext } from "~/context/ListVocal";
import ItemListVocabOfSub_PublicWordlist from "../ItemListVocabOfSub_PublicWordlist/ItemListVocabOfSub_PublicWordlist";
export default function ItemSubCategoryOfPublicSub({ subcategory }) {
  const [title, setTitle] = useState(subcategory.title);
  const [listVocabOfSubCategory, setListVocabOfSubCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const wrapRef = useRef();
  const [bgcolor, setBgcolor] = useState("#FAFAFA");

  const navigation = useNavigation();

  const getVocabOfSubCategory = async (idWL, idSub) => {
    const data = await getAllVocabOfSubCategory(idWL, idSub);
    setListVocabOfSubCategory(data);
    console.log("\n\n\ntes: ", data);
  };
  const handleDeleteVocal = (vocalId, defId) => {
    const listWordFilter = listVocabOfSubCategory.filter(
      (item) => defId !== item.definition.defId
    );

    setListVocabOfSubCategory(listWordFilter);
  };

  useEffect(() => {
    getVocabOfSubCategory(subcategory.wordListId, subcategory.subcategoryId);
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getVocabOfSubCategory(subcategory.wordListId, subcategory.subcategoryId);
  //   }, [])
  // );

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        marginTop: 2,
        backgroundColor: bgcolor,
        borderRadius: 15,
      }}
    >

      {/* //item sub */}
      {/* <View> */}
      {/* View combobox */}
      <View
        // style={{ marginTop: 15 }}
        style={[Styles.wrappered]}
        ref={wrapRef}
      >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showArrowIcon={true}
          style={{
            backgroundColor: "#FEFEFE",
            borderWidth: 0,
            height: 80,
            borderRadius: 0,
          }}
          textStyle={{
            fontSize: 16,
          }}
          // placeholder="Sub Category"
          placeholder={title}
          placeholderStyle={{
            color: colors.textTitle,
            fontFamily: "Quicksand-Bold",
            marginLeft: 10,
            fontSize: 18,
            letterSpacing: 0.2,
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
            marginRight:10,
            
          }}
        />

        {/* View list word of subcategory */}
        <Animated.View>
          {/* {open && <ItemAddNewWord onAddWordToSub={handleAddWordToSub} />} */}
          {open && (
            <ItemListVocabOfSub_PublicWordlist
              subcategory={subcategory}
              listVocabOfSubCategory={listVocabOfSubCategory}
              onDeleteVocal={handleDeleteVocal}
            />
          )}
        </Animated.View>
      </View>

      {/* </View> */}
    </View>
  );
}
