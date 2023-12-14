import React, { useEffect, useState } from "react";
import { getInforBoxOfUser } from "~/api/Leitner";
import { ScrollView, StyleSheet, View } from "react-native";
import BoxesGame from "./BoxesGame";
import { filterBoxes } from "~/helper";

export default function ListBoxesGame({ level, changeLevel }) {
  const [boxes, setBoxes] = useState([]);
  const getBoxes = async () => {
    try {
      const res = await getInforBoxOfUser();
      setBoxes(filterBoxes(res, parseInt(level)));
    } catch (error) {}
  };
  useEffect(() => {
    getBoxes();
  }, []);
  return (
    <View style={Styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {boxes.map(
          (item, index) =>
            item.level !== "0" && (
              <BoxesGame
                item={item}
                key={index}
                level={level}
                changeLevel={changeLevel}
              />
            )
        )}
      </ScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
