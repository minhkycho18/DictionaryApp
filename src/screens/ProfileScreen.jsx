import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Button
        onPress={async () => {
          await AsyncStorage.clear();
        }}
        title="Logout"
      />
    </View>
  );
}
