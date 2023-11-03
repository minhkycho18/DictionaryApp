import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { View } from "react-native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import { SlideInUp } from "react-native-reanimated";
import ItemListVocabOfSub from "../ItemListVocabOfSub/ItemListVocabOfSub";
import ItemAddNewWord from "../ItemAddNewWord/ItemAddNewWord";
import { Swipeable } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Styles } from "./Styles";
import tw from "twrnc";

export default function ItemSubCategory({ subcategory, onDelete }) {
  const [title, setTitle] = useState(subcategory.title);
  const wrapRef = useRef();
  const iconRef = useRef();
  const [bgcolor, setBgcolor] = useState('#FAFAFA');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
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
                  onPress={() => (setModalVisible(false))}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.modal_button_delete}
                  onPress={() => handleDelete( subcategory.wordListId, subcategory.subcategoryId)}
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

          {/* View list word of subcategory */}
          <Animated.View>
            {open && <ItemAddNewWord />}
            {open && <ItemListVocabOfSub
              subcategory={subcategory}
              isopen={open}
            />}
          </Animated.View>
        </View>

        {/* </View> */}
      </Swipeable>
    </View>


  );
}
