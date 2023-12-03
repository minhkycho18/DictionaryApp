import React, { useEffect, useRef, useState, useCallback } from "react";
import { Animated, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { useFocusEffect } from "@react-navigation/native";
import { Styles } from "./Styles";
import { IconClone, colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { getAllVocabOfSubCategory } from "~/api/Subcategory";
import { checkLogin } from "~/helper/Auth";
import { SvgXml } from "react-native-svg";
import ItemListVocabOfSub_PublicWordlist from "../ItemListVocabOfSub_PublicWordlist/ItemListVocabOfSub_PublicWordlist";
export default function ItemSubCategoryOfPublicSub({
  subcategory,
  onPresentModal,
}) {
  const [isLogin, setIsLogin] = useState(false);
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

  const checkToken = async () => {
    const check = await checkLogin();
    setIsLogin(check);
  };

  const getVocabOfSubCategory = async (idWL, idSub, limit) => {
    const data = await getAllVocabOfSubCategory(idWL, idSub, limit);
    setListVocabOfSubCategory(data.content);
  };

  useEffect(() => {
    getVocabOfSubCategory(
      subcategory.wordListId,
      subcategory.subcategoryId,
      subcategory.amountOfWord === 0 ? 20 : subcategory.amountOfWord
    );
    checkToken();
  }, []);
  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [])
  );

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
      {isLogin && (
        <TouchableOpacity
          style={Styles.buttonClone}
          onPress={() => onPresentModal(subcategory.subcategoryId)}
        >
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              fontSize: 14,
              color: `#2959a2`,
            }}
          >
            Clone
          </Text>
          <SvgXml width="20" height="20" xml={IconClone("#2959a2")} />
        </TouchableOpacity>
      )}
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
            marginRight: 10,
          }}
          listMode="SCROLLVIEW"
        />

        {/* View list word of subcategory */}
        <Animated.View>
          {/* {open && <ItemAddNewWord onAddWordToSub={handleAddWordToSub} />} */}
          {open && (
            <ItemListVocabOfSub_PublicWordlist
              subcategory={subcategory}
              listVocabOfSubCategory={listVocabOfSubCategory}
            />
          )}
        </Animated.View>
      </View>

      {/* </View> */}
    </View>
  );
}
