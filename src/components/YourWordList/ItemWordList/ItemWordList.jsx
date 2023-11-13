import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Styles } from "./Styles";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { getAllSubCategory } from "~/api/Subcategory";
import { delay } from "~/helper";
import { MaterialIcons } from "@expo/vector-icons";

import FormEdit from "~/components/BottomSheet/FormEdit/FormEdit";
export default function ItemWordList({ wordlist, onRefresh, onDelete }) {
  const [subs, setSubs] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLeftSwipe, setIsLeftSwipe] = useState(false);
  const [isRightSwipe, setIsRightSwipe] = useState(false);
  const [isOpenModaEdit, setIsOpenModaEdit] = useState(false);
  const [isSwiped, setIsSwiped] = useState(false);

  const wrapRef = useRef();
  const iconRef = useRef();
  const navigation = useNavigation();
  const handleDetailWordList = async () => {
    if (!isSwiped) {
      navigation.push("YourWordlistDetail", {
        Wordlist: {
          id: wordlist.item.id,
          title: wordlist.item.title,
          listDesc: wordlist.item.listDesc,
        },
      });
    }
  };
  const getAllSub = async (id) => {
    try {
      const listSub = await getAllSubCategory(id);
      setSubs(listSub);
    } catch (error) {}
  };
  const handleDelete = (id) => {
    onDelete(id);
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllSub(wordlist.item.id);
    }, [])
  );

  useEffect(() => {
    getAllSub(wordlist.item.id);
  }, []);

  const leftSwipe = () => {
    // setIsLeftSwipe(true);
    // console.log("test left swipe : ", isLeftSwipe);
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
    setIsSwiped(true);
    iconRef.current.setNativeProps({ style: { display: "none" } });
  };
  const onSwipeableClose = () => {
    setIsSwiped(false);
    setIsLeftSwipe(false);
    setIsRightSwipe(false);
    wrapRef.current.setNativeProps({
      style: { ...Styles.wrappered, ...Styles.wrappered_close },
    });
    iconRef.current.setNativeProps({ style: { display: "block" } });
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  const rightSwipe = () => {
    return (
      <TouchableOpacity
        style={Styles.edit}
        onPress={() => {
          setIsOpenModaEdit(!isOpenModaEdit);
        }}
      >
        <FontAwesome5 name="pen" size={20} color="white" />
      </TouchableOpacity>
    );
  };
  const handleCloseModalEdit = async (res) => {
    setIsOpenModaEdit(false);
    delay(1000);
    onRefresh(res);
  };
  const onSwipeableRightOpen = () => {
    setIsSwiped(true);
    wrapRef.current.setNativeProps({
      style: {
        ...Styles.wrappered_right,
        // ...Styles.wrappered_open_swipe_right,
      },
    });
    iconRef.current.setNativeProps({ style: { display: "none" } });
  };
  return (
    <View style={Styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={Styles.item}
        onPress={handleDetailWordList}
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
                    paddingBottom: 20,
                    paddingTop: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      tw` text-base pt-3 pb-3`,
                      { color: "#182B40", fontFamily: "Quicksand-SemiBold" },
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
                    <Text
                      style={{
                        color: "blue",
                        fontFamily: "Quicksand-SemiBold",
                        fontSize: 15,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.modal_button_delete}
                    onPress={() => handleDelete(wordlist.item.id)}
                  >
                    <Text
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontFamily: "Quicksand-SemiBold",
                        fontSize: 15,
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            // onBackdropPress={() => {
            //   setIsOpenModaAdd(false);
            //   setIsOpen(true);
            // }}
            // onBackButtonPress={() => setIsOpenModaAdd(false)}
            isVisible={isOpenModaEdit}
            // onSwipeComplete={handlePresentModalAdd}
            animationIn="bounceIn"
            animationOut="bounceOut"
            animationInTiming={900}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            style={Styles.modal}
          >
            <View style={Styles.modalContent}>
              <View style={Styles.viewBottomSheet}>
                <FormEdit
                  isEditWordlist={true}
                  onCancel={() => setIsOpenModaEdit(false)}
                  onConfirm={handleCloseModalEdit}
                  wordlist={wordlist}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={Styles.background}>
          <View
            style={{
              backgroundColor: "#E51400",
              width: "50%",
              height: "100%",
            }}
          />
          <View
            style={{
              backgroundColor: "#007ACC",
              width: "50%",
              height: "100%",
            }}
          />
        </View>
        <Swipeable
          friction={2.7}
          renderLeftActions={leftSwipe}
          renderRightActions={rightSwipe}
          onSwipeableLeftOpen={onSwipeableOpen}
          onSwipeableWillClose={onSwipeableClose}
          onSwipeableRightOpen={onSwipeableRightOpen}
        >
          <View style={[tw`bg-gray-100`, Styles.wrappered]} ref={wrapRef}>
            <Image
              source={require("~/assets/wordlist.png")}
              style={[tw`bg-gray-100`, Styles.Image]}
            ></Image>
            <View style={Styles.Text_content}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    tw`text-lg`,
                    {
                      color: colors.textTitle,
                      fontFamily: "Quicksand-SemiBold",
                      letterSpacing: 0.2,
                    },
                  ]}
                >
                  {wordlist.item.title}
                </Text>
                {wordlist.item.listType === "PRIVATE" ? (
                  <MaterialIcons
                    name="lock"
                    size={20}
                    color={colors.textTitle}
                  />
                ) : (
                  <MaterialIcons
                    name="public"
                    size={20}
                    color={colors.textTitle}
                  />
                )}
              </View>

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
                {subs.length} sub-list
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
    </View>
  );
}
