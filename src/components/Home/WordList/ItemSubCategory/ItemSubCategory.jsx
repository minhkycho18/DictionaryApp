import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { View } from "react-native";
// import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
// import { Styles } from "./Styles";
// import tw from "twrnc";
// import { Entypo } from "@expo/vector-icons";
// import { Swipeable } from "react-native-gesture-handler";
// import { Fontisto } from "@expo/vector-icons";
// import Modal from "react-native-modal";
// import { useNavigation } from "@react-navigation/native";

import DropDownPicker from "react-native-dropdown-picker";
import { SlideInUp } from "react-native-reanimated";
import ItemListVocabOfSub from "../ItemListVocabOfSub/ItemListVocabOfSub";
export default function ItemSubCategory({ wordlist, onDelete }) {
    //   const [title, setTitle] = useState(wordlist.item.title);
    //   const [isModalVisible, setModalVisible] = useState(false);
    //   const wrapRef = useRef();
    //   const iconRef = useRef();
    //   const navigation = useNavigation();
    //   const handleDetailWordList = async () => {
    //     navigation.push("YourWordlistDetail");
    //     console.log("test: ","click item");
    //   };

    //   const handleDelete = (id) => {
    //     onDelete(id);
    //   };
    //   const leftSwipe = () => {
    //     return (
    //       <TouchableOpacity
    //         style={Styles.trash}
    //         onPress={() => {
    //           setModalVisible(true);
    //         }}
    //       >
    //         <Fontisto name="trash" size={24} color="white" />
    //       </TouchableOpacity>
    //     );
    //   };
    //   const onSwipeableOpen = () => {
    //     wrapRef.current.setNativeProps({
    //       style: {
    //         ...Styles.wrappered,
    //         ...Styles.wrappered_open,
    //       },
    //     });
    //     iconRef.current.setNativeProps({ style: { display: "none" } });
    //   };
    //   const onSwipeableClose = () => {
    //     wrapRef.current.setNativeProps({
    //       style: { ...Styles.wrappered, ...Styles.wrappered_close },
    //     });
    //     iconRef.current.setNativeProps({ style: { display: "block" } });
    //   };


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);
    const remoteItems = [
        { id: 1, title: 'Item 1', val: 'item-1' },
        { id: 2, title: 'Item 2', val: 'item-2' },
    ];
    const [isItemListVocabVisible, setIsItemListVocabVisible] = useState(false);
    const slideUp = new Animated.Value(0);

    const toggleItemistVocabVisibility = () => {
        // if (isItemStudyVisible) {
        if (open) {

            Animated.timing(slideUp, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false, // Make sure to set this to false for a smoother animation.
            }).start();
        } else {
            // setIsItemStudyVisible(true);
            Animated.timing(slideUp, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false, // Make sure to set this to false for a smoother animation.
            }).start();
        }
    };
    const itemListVocabStyle = {
        //     transform: [
        //         {
        //             translateY: SlideInUp.interpolate({
        //                 inputRange: [0, 1],
        //                 outputRange: [1, 0], // Adjust this value as needed for the desired slide distance.
        //             }),
        //         },
        //     ],
    };
    return (

        //item sub
        < View >
            {/* View combobox */}
            < View >
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
                        elevation: 4,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3,
                        height: 55,
                        borderRadius: 15,
                        marginBottom: 15,

                    }}
                    textStyle={{
                        fontSize: 16
                    }}

                    placeholder="Sub Category"
                    placeholderStyle={{
                        color: "#462D4E",
                        fontWeight: "bold",
                    }}
                    showTickIcon={false}
                    dropDownContainerStyle={{
                        backgroundColor: "#1ead31",
                        height: 0,
                        borderWidth: 0,
                        elevation: 4,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 3,
                        borderRadius: 15
                    }}
                    arrowIconStyle={{
                        width: 22,
                        height: 22
                    }}
                />
            </View >

            {/* View list word of subcategory */}
            < Animated.View style={itemListVocabStyle} >
                {open && <ItemListVocabOfSub />}
                
            </Animated.View >
        </View >

    );
}
