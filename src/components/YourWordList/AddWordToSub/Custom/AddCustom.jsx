import React, { useState, useRef, useEffect, useContext } from "react";
import { Styles } from "./Styles";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { useNavigation } from "@react-navigation/native";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { createNewWordLists, getWordListByWordlistId } from "~/api/WordList";
import { MaterialIcons } from "@expo/vector-icons";
import FieldNoRequired from "./FieldNoRequired/FieldNoRequired";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import { ListComponentDescContext } from "~/context/ListComponentDesc";
import { Ionicons } from "@expo/vector-icons";
import { addWordCustomToSub } from "~/api/Subcategory";
import { delay } from "~/helper";
import Modal from "react-native-modal";
import { getAllPartOfSpeech } from "~/api/Dictionary";

const AddCustom = (props) => {
  const { fieldMain, addFieldMain, Remove } = useContext(
    ListComponentDescContext
  );
  const titleRef = useRef();
  const descRef = useRef();
  const exampleRef = useRef();

  // field of cusword
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [example, setExample] = useState("");
  const [fileResponseUS, setFileResponseUS] = useState("");
  const [fileResponseUK, setFileResponseUK] = useState("");
  const [phoneUs, setPhoneUs] = useState("");
  const [phoneUk, setPhoneUk] = useState("");
  const [pos, setPos] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Adv", value: "adv" },
    { label: "Adj", value: "adj" },
    { label: "Noun", value: "noun" },
    { label: "Verb", value: "Verb" },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  ////////
  const [fieldMainComponents, setFieldMainComponents] = useState(fieldMain);
  const [isDisplay, setIsDisplay] = useState(false);
  const params = props.route.params;
  const navigation = useNavigation();

  const handlePresentModal = async () => {
    if (title === "" || desc === "" || pos === "") {
      showToast("Warning", "Please fill in all field", "error");
      if (title === "") {
        titleRef.current.setNativeProps({
          style: Styles.warning,
        });
      }
      if (desc === "") {
        descRef.current.setNativeProps({
          style: Styles.warning,
        });
      }
    } else {
      setIsModalVisible(true);
    }
  };
  const handleSave = async (contribute) => {
    try {
      const listDef = fieldMainComponents.map(
        (component) => component.props.data
      );
      const customWord = {
        word: title,
        wordType: "DEFAULT",
        pos: pos,
        phoneUs: phoneUs,
        phoneUk: phoneUk,
        audioUs: fileResponseUS,
        audioUk: fileResponseUK,
        definition: [
          {
            wordDesc: desc,
            example: example,
          },
          ...listDef,
        ],
        subcategoryId: params.subcategoryId,
        isContribute: contribute,
      };
      const res = await addWordCustomToSub(
        params.wordlistId,
        params.subcategoryId,
        customWord
      );
      console.log(`word custom ::`, res);
      // showToast("Success", "Create custom vocabulary successfully", "success");

      const wordlist = await getWordListByWordlistId(params.wordlistId);
      // await delay(1000);
      navigation.navigate("YourWordlistDetail", {
        Wordlist: {
          id: wordlist.id,
          title: wordlist.title,
          listDesc: wordlist.listDesc,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getAllPos = async () => {
      const res = await getAllPartOfSpeech();
      const customRes = res.map((item) => ({ label: item, value: item }));
      setItems(customRes);
    };
    getAllPos();
  }, []);
  useEffect(() => {
    setFieldMainComponents(fieldMain);
  }, [fieldMain]);

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "left",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 800,
      autoHide: true,
      topOffset: 10,
    });
  };

  const addFieldMainComponent = () => {
    addFieldMain();
  };

  const handlePressMore = () => {
    setIsDisplay(!isDisplay);
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Styles.scrollView}
      >
        <View>
          <TextInput
            style={{ ...Styles.inputTitle, fontFamily: "Quicksand-Medium" }}
            placeholder="Write your word"
            value={title}
            ref={titleRef}
            onChangeText={setTitle}
            autoFocus={true}
            onFocus={() => {
              titleRef.current.setNativeProps({
                borderColor: "#6a64f1",
                borderBottomWidth: 4,
              });
            }}
            onBlur={() => {
              titleRef.current.setNativeProps({
                borderColor: "#e0e0e0",
                borderBottomWidth: 3,
              });
            }}
          />
          <Text
            style={{
              ...Styles.formLabel,
              fontFamily: "Quicksand-SemiBold",
              marginTop: 2,
              marginBottom: -2,
            }}
          >
            Word
          </Text>
        </View>
        {!isDisplay && (
          <TouchableOpacity style={Styles.more} onPress={handlePressMore}>
            <MaterialIcons
              name="add"
              size={20}
              color="#4F62F7"
              style={{ marginTop: 4 }}
            />
            <Text
              style={{
                fontFamily: "Quicksand-Bold",
                fontSize: 17,
                marginLeft: 3,
                color: "#4F62F7",
              }}
            >
              More
            </Text>
          </TouchableOpacity>
        )}
        {isDisplay && (
          <TouchableOpacity style={Styles.more} onPress={handlePressMore}>
            <AntDesign
              name="minus"
              size={20}
              color="#4F62F7"
              style={{ marginTop: 4 }}
            />

            <Text
              style={{
                fontFamily: "Quicksand-Bold",
                fontSize: 17,
                marginLeft: 2,
                color: "#4F62F7",
              }}
            >
              Less
            </Text>
          </TouchableOpacity>
        )}

        {isDisplay && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 10,
              justifyContent: "center",
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <FieldNoRequired
              onSetPos={(text) => setPos(text)}
              onSetPhoneUk={(text) => setPhoneUk(text)}
              onSetPhoneUs={(text) => setPhoneUs(text)}
              onSetFileResponseUK={(text) => setFileResponseUK(text)}
              onSetFileResponseUS={(text) => setFileResponseUS(text)}
              onGetFileError={(text1, text2) =>
                showToast(text1, text2, "error")
              }
            />
          </View>
        )}

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            width: "100%",
            marginVertical: 15,
          }}
        >
          <View style={Styles.inputFirstContent}>
            <View>
              <Text
                style={{
                  ...Styles.formLabel,
                  fontFamily: "Quicksand-SemiBold",
                }}
              >
                Part of speech
              </Text>
              {/* <View
                style={{ flexDirection: "row", marginBottom: 10, zIndex: 1000 }}
              > */}
              <DropDownPicker
                open={open}
                value={pos}
                items={items}
                setOpen={setOpen}
                setValue={(value) => {
                  setPos(value);
                }}
                setItems={setItems}
                style={{
                  backgroundColor: "#FEFEFE",
                  borderRadius: 10,
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                  zIndex: 1000,
                  marginBottom: 10,
                }}
                textStyle={{
                  color: "#6b7280",
                  fontFamily: "Quicksand-Medium",
                  fontSize: 14,
                }}
                placeholder="Select a part of speech "
                placeholderStyle={{
                  color: "#6b7280",
                  fontFamily: "Quicksand-Medium",
                  fontSize: 14,
                }}
                showTickIcon={false}
                dropDownContainerStyle={{
                  height: 120,
                  borderWidth: 1,
                  borderColor: "#e0e0e0",
                  zIndex: 1000,
                }}
                listMode="SCROLLVIEW"
              />
              {/* </View> */}
            </View>
            <View>
              <Text
                style={{
                  ...Styles.formLabel,
                  fontFamily: "Quicksand-SemiBold",
                }}
              >
                Description
              </Text>
              <TextInput
                style={{ ...Styles.input, fontFamily: "Quicksand-Medium" }}
                placeholder="Write description"
                value={desc}
                ref={descRef}
                onChangeText={setDesc}
                onBlur={() => {
                  descRef.current.setNativeProps({
                    borderColor: "#e0e0e0",
                  });
                }}
                onFocus={() => {
                  descRef.current.setNativeProps({
                    borderColor: "#6a64f1",
                  });
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  ...Styles.formLabel,
                  fontFamily: "Quicksand-SemiBold",
                }}
              >
                Example
              </Text>
              <TextInput
                style={{ ...Styles.input, fontFamily: "Quicksand-Medium" }}
                placeholder="Write example"
                value={example}
                onChangeText={setExample}
                ref={exampleRef}
                onFocus={() => {
                  exampleRef.current.setNativeProps({
                    borderColor: "#6a64f1",
                  });
                }}
                onBlur={() => {
                  exampleRef.current.setNativeProps({
                    borderColor: "#e0e0e0",
                  });
                }}
              />
            </View>
          </View>
        </View>
        {fieldMainComponents.map((component, index) => (
          <React.Fragment key={index}>{component}</React.Fragment>
        ))}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            width: "100%",
            height: 70,
          }}
        >
          <TouchableOpacity
            style={Styles.viewAddCard}
            onPress={addFieldMainComponent}
          >
            <View style={Styles.viewAddCard_content}>
              <MaterialIcons
                name="add"
                size={25}
                color={colors.textTitle}
                style={{ marginTop: 4 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  marginLeft: 5,
                }}
              >
                Add Card
              </Text>
            </View>
            <View style={Styles.Line}></View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Toast
        config={toastConfig}
        refs={(ref) => {
          Toast.setRef(ref);
        }}
      />
      <TouchableOpacity style={Styles.buttonAdd} onPress={handlePresentModal}>
        <Ionicons
          name="add-circle"
          size={20}
          color="white"
          style={{ marginTop: 4 }}
        />
        <Text
          style={{
            fontSize: 18,
            color: "white",
            fontFamily: "Quicksand-Bold",
          }}
        >
          Create
        </Text>
      </TouchableOpacity>

      <View>
        <Modal
          animationType="slide"
          isVisible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={Styles.modal_container}>
            <View style={Styles.modal_content}>
              <View
                style={{
                  paddingBottom: 20,
                  paddingTop: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    {
                      color: "#182B40",
                      fontFamily: "Quicksand-SemiBold",
                      textAlign: "center",
                      fontSize: 15,
                    },
                  ]}
                >
                  Would you like to contribute this vocabulary to the system ?
                </Text>
              </View>
              <View style={Styles.modal_view_button}>
                <TouchableOpacity
                  style={Styles.modal_button_cancel}
                  onPress={() => handleSave(false)}
                >
                  <Text
                    style={{
                      color: "blue",
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 18,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.modal_button_delete}
                  onPress={() => handleSave(true)}
                >
                  <Text
                    style={{
                      color: "#28a745",
                      textAlign: "center",
                      fontFamily: "Quicksand-SemiBold",
                      fontSize: 18,
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default AddCustom;
