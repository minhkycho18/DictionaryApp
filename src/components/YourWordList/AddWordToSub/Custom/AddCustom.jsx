import React, { useState, useRef, useEffect } from "react";
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
import Toast, { ErrorToast } from "react-native-toast-message";
import { createNewWordLists } from "~/api/WordList";
import { MaterialIcons } from "@expo/vector-icons";
import FeildDesc_Ex from "./FieldDesc_Ex/FeildDesc_Ex";
import FieldNoRequired from "./FieldNoRequired/FieldNoRequired";
import { FontAwesome } from "@expo/vector-icons";

const AddCustom = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const exampleRef = useRef();

  // const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [example, setExample] = useState("");
  const [fieldMainComponents, setFieldMainComponents] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [key, setKey] = useState(0);
  const navigation = useNavigation();

  const handleCreate = () => {
    if (title === "" || desc === "" || type === "") {
      showToast("Warning", "Please fill in all field");
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
        const listType = type === "1" ? "PUBLIC" : "PRIVATE";
        try {
          const res = await createNewWordLists({
            title: title,
            listDesc: desc,
            listType: listType,
          });
          navigation.navigate("YourWordlist", res);
        } catch (error) {
          showToast("Error", "Create word list fail");
        }
      };
      create();
    }
  };

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
      topOffset: 50,
    });
  };

  const addFieldMainComponent = () => {
    const newIndex = key;
    const object = {
      example: "",
      desc: "",
    };
    const newFieldMainComponent = (
      <FeildDesc_Ex
        key={newIndex}
        index={newIndex}
        data={object}
        onRemove={handleRemove}
      />
    );

    setKey((key) => key + 1);
    setFieldMainComponents([...fieldMainComponents, newFieldMainComponent]);
  };
  const handleSave = () => {
    const updatedData = fieldMainComponents.map(
      (component) => component.props.data
    );
    console.log(updatedData);
  };
  const handlePressMore = () => {
    setIsDisplay(!isDisplay);
  };
  const handleRemove = (key) => {
    const newMainComponent = fieldMainComponents.filter(
      (item, index) => index !== key
    );
    setFieldMainComponents(newMainComponent);
  };
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
            <FieldNoRequired />
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
            height: 202,
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
      <TouchableOpacity style={Styles.buttonAdd} onPress={handleSave}>
        <FontAwesome
          name="cloud-download"
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
    </SafeAreaView>
  );
};

export default AddCustom;
