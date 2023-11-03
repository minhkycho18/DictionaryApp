import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Styles } from "./Styles";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function setModalVisibleItemWordList({ wordlist, onDelete }) {
  const [title, setTitle] = useState(wordlist.item.title);
  const [isModalVisible, setModalVisible] = useState(false);
  const wrapRef = useRef();
  const iconRef = useRef();
  const navigation = useNavigation();
  const handleDetailWordList = async () => {
    navigation.push("YourWordlistDetail", { Wordlist : wordlist });
  };
  const handleDelete = (id) => {
    onDelete(id);
  };
  const leftSwipe = () => {
    return (
      <TouchableOpacity
        style={Styles.trash}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Fontisto name="trash" size={24} color="white" />
      </TouchableOpacity>
    );
  };
  const onSwipeableOpen = () => {
    wrapRef.current.setNativeProps({
      style: {
        ...Styles.wrappered,
        ...Styles.wrappered_open,
      },
    });
    iconRef.current.setNativeProps({ style: { display: "none" } });
  };
  const onSwipeableClose = () => {
    wrapRef.current.setNativeProps({
      style: { ...Styles.wrappered, ...Styles.wrappered_close },
    });
    iconRef.current.setNativeProps({ style: { display: "block" } });
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <TouchableOpacity style={Styles.container} onPress={handleDetailWordList}>
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
                  onPress={() => handleDelete(wordlist.item.id)}
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
        <View style={[tw`bg-gray-100`, Styles.wrappered]} ref={wrapRef}>
          <Image
            source={require("~/assets/wordlist.png")}
            style={[tw`bg-gray-100`, Styles.Image]}
          ></Image>
          <View style={Styles.Text_content}>
            <Text
              numberOfLines={1}
              style={[
                tw`text-lg`,
                {
                  color: "#182B40",
                  fontFamily: "Quicksand-SemiBold",
                  letterSpacing: 0.2,
                },
              ]}
            >
              {title}
            </Text>

            <Text
              style={[
                tw`text-base`,
                {
                  color: "#182B40",
                  fontFamily: "Quicksand-Medium",
                  letterSpacing: 0.2,
                },
              ]}
            >
              1 sub-list
            </Text>
          </View>
          <View style={Styles.Icon}>
            <TouchableOpacity onPress={handleDetailWordList} ref={iconRef}>
              <Entypo name="chevron-right" size={26} color="#182B40" />
            </TouchableOpacity>
          </View>
        </View>
      </Swipeable>
    </TouchableOpacity>
  );
}
