import React, { useState, useRef, useEffect } from "react";
import { Styles } from "./Styles";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { createNewWordLists } from "~/api/WordList";
import RadioGroup from "react-native-radio-buttons-group";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { delay, getIdValueInArr } from "~/helper";
const data = [
  {
    id: "1",
    label: "PUBLIC",
    value: "PUBLIC",
    color: "#07074d",
    selected: true,
  },
  {
    id: "2",
    label: "PRIVATE",
    value: "PRIVATE",
    color: "#07074d",
    selected: false,
  },
];
const AddWordList = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const titlelabel = useRef();
  const descLabel = useRef();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigation = useNavigation();

  const handleTitleFocus = () => {
    titleRef.current.setNativeProps({
      style: {
        borderColor: "#6a64f1",
      },
    });
    titlelabel.current.setNativeProps({
      style: {
        color: "#6a64f1",
      },
    });

    descRef.current.setNativeProps({
      borderColor: "#e0e0e0",
    });
    descLabel.current.setNativeProps({
      style: {
        color: "#07074d",
      },
    });
  };
  const handleDescFocus = () => {
    descRef.current.setNativeProps({
      style: {
        borderColor: "#6a64f1",
      },
    });
    titleRef.current.setNativeProps({
      borderColor: "#e0e0e0",
    });
    titlelabel.current.setNativeProps({
      style: {
        color: "#07074d",
      },
    });
    descLabel.current.setNativeProps({
      style: {
        color: "#6a64f1",
      },
    });
  };
  const handleCreate = () => {
    if (title === "" || desc === "" || type === "") {
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
      const create = async () => {
        // const listType = type === "1" ? "PUBLIC" : "PRIVATE";
        try {
          const res = await createNewWordLists({
            title: title,
            listDesc: desc,
            listType: getIdValueInArr(data, type),
          });
          showToast("Success", "Create new wordlist successfully", "success");
          await delay(1500);
          navigation.navigate("YourWordlist", res);
        } catch (error) {
          showToast("Error", error, "error");
        }
      };
      create();
    }
  };
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
      visibilityTime: 1300,
      autoHide: true,
      topOffset: 50,
    });
  };

  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-sharp"
            size={26}
            color="white"
            style={tw`ml-4`}
          />
        </TouchableOpacity>
        <View style={tw`ml-6`}>
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              color: "#fff",
              fontSize: 27,
            }}
          >
            Add Your Word List
          </Text>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 15 }}
          onPress={handleCreate}
        >
          <AntDesign name="check" size={26} color="white" style={tw`ml-4`} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 40, margin: 20 }}>
        <View style={Styles.inputContent}>
          <View>
            <Text
              style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
              ref={titlelabel}
            >
              Word List Title
            </Text>
            <TextInput
              style={{ ...Styles.input, fontFamily: "Quicksand-Medium" }}
              placeholder="Write your title"
              autoFocus={true}
              ref={titleRef}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                titleRef.current.setNativeProps({
                  style: Styles.remove_warning,
                });
              }}
              onFocus={handleTitleFocus}
            />
          </View>
          <View>
            <Text
              style={{
                ...Styles.formLabel,
                fontFamily: "Quicksand-SemiBold",
              }}
              ref={descLabel}
            >
              Word List Description
            </Text>
            <TextInput
              style={{ ...Styles.input, fontFamily: "Quicksand-Medium" }}
              placeholder="Write your description"
              ref={descRef}
              value={desc}
              onChangeText={(text) => {
                setDesc(text);
                descRef.current.setNativeProps({
                  style: Styles.remove_warning,
                });
              }}
              onFocus={handleDescFocus}
            />
          </View>

          <View>
            <Text
              style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
            >
              Word List Type
            </Text>
            <RadioGroup
              radioButtons={data}
              onPress={setType}
              selectedId={type}
              containerStyle={Styles.radioGroup}
            />
          </View>
        </View>
      </View>
      <Toast
        config={toastConfig}
        refs={(ref) => {
          Toast.setRef(ref);
        }}
      />
    </SafeAreaView>
  );
};

export default AddWordList;
