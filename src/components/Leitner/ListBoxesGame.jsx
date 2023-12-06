import React, { useEffect, useState } from "react";
import { getInforBoxOfUser } from "~/api/Leitner";
import { ScrollView, StyleSheet, View } from "react-native";
import BoxesGame from "./BoxesGame";

export default function ListBoxesGame() {
  const [boxes, setBoxes] = useState([]);
  const getBoxes = async () => {
    try {
      const res = await getInforBoxOfUser();
      setBoxes(res);
    } catch (error) {}
  };
  useEffect(() => {
    getBoxes();
  }, []);
  return (
    <View style={Styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {boxes.map((item, index) => (
          <BoxesGame item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
