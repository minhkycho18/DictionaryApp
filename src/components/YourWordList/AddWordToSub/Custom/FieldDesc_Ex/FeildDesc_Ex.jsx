import React, { useState, useRef, useContext } from "react";
import { Styles } from "./Styles";
import { View, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListComponentDescContext } from "~/context/ListComponentDesc";
export default function FeildDesc_Ex({ data, index }) {
  const { Remove } = useContext(ListComponentDescContext);
  const descRef = useRef();
  const exampleRef = useRef();
  const [description, setDescription] = useState(data?.wordDesc);
  const [example, setExample] = useState(data?.example);

  const handleExampleChange = (text) => {
    data.example = text;
    setExample(text);
  };

  const handleDescriptionChange = (text) => {
    data.wordDesc = text;
    setDescription(text);
  };
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  const handleRemove = (key) => {
    Remove(key);
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
              <Ionicons name="md-close-sharp" size={24} color="#2e3856" />
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
