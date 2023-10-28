import React, { useState } from "react";
import { Styles } from "./Styles";
import { View, Text, TextInput } from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function FeildDesc_Ex({ data }) {
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
  return (
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
            style={{ ...Styles.input, fontFamily: "Quicksand-Regular" }}
            placeholder="Write description"
            value={description}
            onChangeText={handleDescriptionChange}
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
            style={{ ...Styles.input, fontFamily: "Quicksand-Regular" }}
            placeholder="Write example"
            value={example}
            onChangeText={handleExampleChange}
          />
        </View>
      </View>
    </View>
  );
}
