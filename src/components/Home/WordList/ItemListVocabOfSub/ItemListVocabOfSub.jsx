import React, { useState } from "react";
import { View, Image } from "react-native";
import { Styles } from "../ItemVocabOfSub/Styles";
import { SvgXml } from "react-native-svg";
import { svgStudy } from "~/constants/theme";
import ItemVocabOfSub from "../ItemVocabOfSub/ItemVocabOfSub";
import { FlatList } from "react-native";
import { Text } from "react-native";
export default function ItemListVocabOfSub() {
  const [wordLists, setWordLists] = useState([]);
  const data = [
    {
      id: 1,
      title: "wordlist1",
      listDesc: "wordlist1",
      createdBy: "learner1",
      listType: "PUBLIC",
      createdAt: "10-10-2023",
    },
    {
      id: 2,
      title: "wordlist2",
      listDesc: "wordlist2",
      createdBy: "learner1",
      listType: "PRIVATE",
      createdAt: "10-10-2023",
    },
  ];
  // setWordLists(data);
  return (
    // <FlatList
    //     style={{
    //         backgroundColor: 'red'
    //     }}
    //     showsVerticalScrollIndicator={false}
    //     vertical
    //     keyExtractor={(item) => item.id}
    //     data={wordLists}
    //     renderItem={(item) => (
    //         <GestureHandlerRootView>
    //             <ItemVocabOfSub
    //                 wordlist={item}
    //                 onDelete={handleDelete}
    //             />
    //         </GestureHandlerRootView>
    //     )}
    // />
    <>
      {data.map((item) => (
        <View
          key={item.id}
          style={{
            backgroundColor: "red",
            height: 100,
            width: "100%",
            borderBottomWidth: 2,
          }}
        >
          <Text>flatlist</Text>
        </View>
      ))}
    </>
  );
}
