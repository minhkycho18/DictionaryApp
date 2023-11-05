import React, { useEffect, useRef, useState, useContext } from "react";
import { Animated, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import { SlideInUp } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import ItemListVocabOfSub from "../ItemListVocabOfSub/ItemListVocabOfSub";
import ItemAddNewWord from "../ItemAddNewWord/ItemAddNewWord";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Styles } from "./Styles";
import tw from "twrnc";

import { colors, configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { getAllVocabOfSubCategory } from "~/api/Subcategory";
import { ListVocalContext } from "~/context/ListVocal";
export default function ItemSubCategory({
  subcategory,
  onDisplayButtonDel,
  delSucess,
  isDisplayDel,
  onDelete,
}) {
  const [title, setTitle] = useState(subcategory.title);
  const [displayDel, setDisplayDel] = useState(false);
  const [listVocabOfSubCategory, setListVocabOfSubCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const wrapRef = useRef();
  const iconRef = useRef();
  const [bgcolor, setBgcolor] = useState("#FAFAFA");
  const [isModalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   if(open)
  //   {
  //     setBgcolor('#FAFAFA');
  //   }
  // }, [open]);
  const handleDelete = (idWL, idSub) => {
    onDelete(idWL, idSub);
  };
  const leftSwipe = () => {
    return (
      <TouchableOpacity
        style={Styles.trash}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Fontisto name="trash" size={22} color="white" />
      </TouchableOpacity>
    );
  };

  const onSwipeableOpen = () => {
    if (open) {
      wrapRef.current.setNativeProps({
        style: {
          ...Styles.wrappered,
          ...Styles.wrappered_open,
        },
      });
    }
    // iconRef.current.setNativeProps({ style: { display: "none" } });
  };
  const onSwipeableClose = () => {
    wrapRef.current.setNativeProps({
      style: { ...Styles.wrappered, ...Styles.wrappered_close },
    });
    // iconRef.current.setNativeProps({ style: { display: "block" } });
  };
  const { handleWordSelect, vocalSelect, setVocalSelect } =
    useContext(ListVocalContext);
  const navigation = useNavigation();
  const handleAddWordToSub = () => {
    // setOpen(false);
    navigation.navigate("AddWordToSub", {
      wordlistId: subcategory.wordListId,
      subcategoryId: subcategory.subcategoryId,
    });
  };
  const getVocabOfSubCategory = async (idWL, idSub) => {
    const data = await getAllVocabOfSubCategory(idWL, idSub);
    setListVocabOfSubCategory(data);
  };
  const handleSelect = (data) => {
    handleWordSelect({
      subcategoryId: subcategory.subcategoryId,
      ...data,
    });
  };
  useEffect(() => {
    // setOpen(false);

    setDisplayDel(false);
    const listWordFilter = listVocabOfSubCategory.filter(
      (item) => !vocalSelect.some((i) => i.defId === item.definition.defId)
    );
    setListVocabOfSubCategory(listWordFilter);
  }, [delSucess]);

  useEffect(() => {
    if (displayDel) {
      setDisplayDel(false);
      onDisplayButtonDel();
      setVocalSelect([]);
    }
  }, [open]);
  useEffect(() => {
    getVocabOfSubCategory(subcategory.wordListId, subcategory.subcategoryId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getVocabOfSubCategory(subcategory.wordListId, subcategory.subcategoryId);
    }, [])
  );

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <View
      style={{
        marginTop: 15,
        backgroundColor: bgcolor,
        borderRadius: 15,
      }}
    >
      <View>
        <Modal
          animationType="slide"
          isVisible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={Styles.modal_container}>
            <View style={Styles.modal_content}>
              <View
                style={{
                  paddingBottom: 5,
                  paddingTop: 5,
                }}
              >
                <Text
                  style={[
                    tw`ml-5 tracking-wider text-sm pt-3 pb-3`,
                    { color: "#182B40" },
                  ]}
                >
                  Are you sure you want to delete ?
                </Text>
              </View>
              <View style={Styles.modal_view_button}>
                <TouchableOpacity
                  style={Styles.modal_button_cancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.modal_button_delete}
                  onPress={() =>
                    handleDelete(
                      subcategory.wordListId,
                      subcategory.subcategoryId
                    )
                  }
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Swipeable
        renderLeftActions={leftSwipe}
        onSwipeableOpen={onSwipeableOpen}
        onSwipeableWillClose={onSwipeableClose}
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
              color: colors.textTitle,
              fontFamily: "Quicksand-Bold",
              marginLeft: 5,
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
            }}
          />

          {/* View list word of subcategory */}
          <Animated.View>
            {open && <ItemAddNewWord onAddWordToSub={handleAddWordToSub} />}
            {open && (
              <ItemListVocabOfSub
                subcategory={subcategory}
                isopen={open}
                onSelect={handleSelect}
                onDisplayButtonDel={() => onDisplayButtonDel()}
                onDisplayCheckBox={() => setDisplayDel(true)}
                listVocabOfSubCategory={listVocabOfSubCategory}
                isDisplayDel={isDisplayDel}
              />
            )}
          </Animated.View>
        </View>

        {/* </View> */}
      </Swipeable>
    </View>
  );
}
