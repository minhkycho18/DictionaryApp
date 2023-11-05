import React, { useState, useRef } from "react";
import { Styles } from "./Styles";
import { View, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
export default function FeildDesc_Ex({ data, index, onRemove }) {
  const descRef = useRef();
  const exampleRef = useRef();
  const [description, setDescription] = useState("");
  const [example, setExample] = useState("");

  const handleExampleChange = (text) => {
    data.example = text;
    setExample(text);
  };

  const handleDescriptionChange = (text) => {
    data.desc = text;
    setDescription(text);
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const handleRemove = (key) => {
    onRemove(key);
  };
  return (
    <View style={Styles.content}>
      <View style={Styles.inputFirstContent}>
        <View>
          <View style={Styles.titleDesc}>
            <Text
              style={{
                ...Styles.formLabel,
                fontFamily: "Quicksand-SemiBold",
              }}
            >
              Description
            </Text>
            <TouchableOpacity onPress={() => handleRemove(index)}>
              <Entypo name="trash" size={24} color="#2e3856" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={{ ...Styles.input, fontFamily: "Quicksand-Medium" }}
            placeholder="Write description"
            value={description}
            onChangeText={handleDescriptionChange}
            ref={descRef}
            onFocus={() => {
              descRef.current.setNativeProps({
                borderColor: "#6a64f1",
              });
            }}
            onBlur={() => {
              descRef.current.setNativeProps({
                borderColor: "#e0e0e0",
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
            onChangeText={handleExampleChange}
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
  );
}
