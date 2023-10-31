import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Styles } from "../ItemVocabOfSub/Styles";

import { Text } from "react-native";
import tw from "twrnc";
import { getAllVocabOfSubCategory } from "~/api/Subcategory";
import ItemVocabOfSub from "../ItemVocabOfSub/ItemVocabOfSub";
export default function ItemListVocabOfSub({ subcategory }) {

  const [idSub, setIdSub] = useState(subcategory.subcategoryId);
  const [idWordlist, setIdWordlist] = useState(subcategory.subcategoryId);
  const [listVocabOfSubCategory, setListVocabOfSubCategory] = useState([]);

  const getVocabOfSubCategory = async (idWL, idSub) => {
    const data = await getAllVocabOfSubCategory(idWL, idSub);
    setListVocabOfSubCategory(data);
  };


  useEffect(() => {
    getVocabOfSubCategory(idWordlist, idSub);
  }, []);
  const wrapRef = useRef();
  // const data = [
  //   {
  //     id: 1,
  //     title: "wordlist1",
  //     listDesc: "wordlist1",
  //     createdBy: "learner1",
  //     listType: "PUBLIC",
  //     createdAt: "10-10-2023",
  //   },
  //   {
  //     id: 2,
  //     title: "wordlist2",
  //     listDesc: "wordlist2",
  //     createdBy: "learner1",
  //     listType: "PRIVATE",
  //     createdAt: "10-10-2023",
  //   },
  //   {
  //     id: 3,
  //     title: "wordlist1",
  //     listDesc: "wordlist1",
  //     createdBy: "learner1",
  //     listType: "PUBLIC",
  //     createdAt: "10-10-2023",
  //   },
  //   {
  //     id: 4,
  //     title: "wordlist2",
  //     listDesc: "wordlist2",
  //     createdBy: "learner1",
  //     listType: "PRIVATE",
  //     createdAt: "10-10-2023",
  //   },
  // ];
  // setWordLists(data);
  return (
    <FlatList
      // style={{
      //   backgroundColor: 'red'
      // }}
      showsVerticalScrollIndicator={false}
      vertical
      keyExtractor={(item) => item.vocabId}
      data={listVocabOfSubCategory}
      renderItem={(item) => (
        // <GestureHandlerRootView>
        //   <ItemWordList 
        //   wordlist={item} 
        //   onDelete={handleDelete}
        //   />
        // </GestureHandlerRootView>

        <ItemVocabOfSub
        Vocab={item}
        />
      )}
    />
  );
}
