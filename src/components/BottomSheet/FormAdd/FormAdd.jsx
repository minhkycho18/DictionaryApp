import React, { useRef, useState } from "react";
import { styles } from "./Styles";
import { View, Text, TextInput } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { useFonts } from "expo-font";
import { configFont, colors } from "~/constants/theme";
import { createNewWordLists } from "~/api/WordList";
import { TouchableOpacity } from "react-native";
import Toast, { ErrorToast } from "react-native-toast-message";
import { getIdValueInArr } from "~/helper";
import { createNewSub } from "~/api/Subcategory";
export default function FormAdd({
  isAddWordlist,
  onCancel,
  onCreate,
  wordlistId,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const descRef = useRef();
  const titleRef = useRef();
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
  const dataSub = [
    {
      id: "1",
      label: "CUSTOM",
      value: "CUSTOM",
      color: "#07074d",
      selected: true,
    },
    {
      id: "2",
      label: "DEFAULT",
      value: "DEFAULT",
      color: "#07074d",
      selected: false,
    },
  ];
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
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
  };
  const showToast = (text1, text2) => {
    Toast.show({
      position: "left",
      type: "error",
      text1: text1,
      text2: text2,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: -100,
    });
  };
  const createNewwordlist = async (data) => {
    try {
      const res = await createNewWordLists(data);
      onCreate();
    } catch (error) {
      showToast("Error", error);
    }
  };
  const createSub = async (wordlistId, data) => {
    try {
      console.log(`ID ::`, wordlistId);
      const res = await createNewSub(wordlistId, data);
      onCreate();
      console.log(res);
    } catch (error) {
      showToast("Error", error);
    }
  };
  const handleCreate = () => {
    if (isAddWordlist) {
      if (title === "" || type === "" || desc === "") {
        showToast("Warning", "Please fill in all field");
        if (title === "") {
          titleRef.current.setNativeProps({
            style: styles.warning,
          });
        }
        if (desc === "") {
          descRef.current.setNativeProps({
            style: styles.warning,
          });
        }
      } else {
        createNewwordlist({
          title: title,
          listDesc: desc,
          listType: getIdValueInArr(data, type),
        });
      }
    } else {
      if (title === "" || type === "") {
        showToast("Warning", "Please fill in all field");
        if (title === "") {
          titleRef.current.setNativeProps({
            style: styles.warning,
          });
        }
      } else {
        createSub(wordlistId, {
          title: title,
          subcategoryType: getIdValueInArr(dataSub, type),
        });
      }
    }
  };

  return (
    <View>
      <Text
        style={{ ...styles.headerBottomSheet, fontFamily: "Quicksand-Bold" }}
      >
        {isAddWordlist ? "Create New Word List" : "Create New Subcategory"}
      </Text>
      <View style={styles.inputContent}>
        <View>
          <Text
            style={{
              ...styles.formLabel,
              fontFamily: "Quicksand-SemiBold",
            }}
          >
            {isAddWordlist ? "Word List Title" : "Subcategory Title"}
          </Text>
          <TextInput
            style={{ ...styles.input, fontFamily: "Quicksand-Medium" }}
            placeholder="Write your title"
            autoFocus={true}
            ref={titleRef}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              titleRef.current.setNativeProps({
                style: styles.remove_warning,
              });
            }}
          />
        </View>
        {isAddWordlist && (
          <View>
            <Text
              style={{
                ...styles.formLabel,
                fontFamily: "Quicksand-SemiBold",
              }}
            >
              Word List Description
            </Text>
            <TextInput
              style={{ ...styles.input, fontFamily: "Quicksand-Medium" }}
              placeholder="Write your description"
              ref={descRef}
              value={desc}
              onChangeText={(text) => {
                setDesc(text);
                descRef.current.setNativeProps({
                  style: styles.remove_warning,
                });
              }}
            />
          </View>
        )}
        <View>
          <Text
            style={{
              ...styles.formLabel,
              fontFamily: "Quicksand-SemiBold",
            }}
          >
            {isAddWordlist ? "Word List Type" : "Subcategory Type"}
          </Text>
          <RadioGroup
            radioButtons={isAddWordlist ? data : dataSub}
            onPress={setType}
            selectedId={type}
            containerStyle={styles.radioGroup}
          />
        </View>
      </View>

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={() => onCancel()}>
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              fontSize: 18,
              color: "#EE8363",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, borderColor: "#67D2B6" }}
          onPress={handleCreate}
        >
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              fontSize: 18,
              color: "#26BE96",
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <Toast
        config={toastConfig}
        refs={(ref) => {
          Toast.setRef(ref);
        }}
      />
    </View>
  );
}
