import React, { useEffect } from "react";
import "./MyWordLists.scss";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ListItem from "../../../components/my-word-lists/ListItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllWordListsById } from "../../../stores/word-lists/wordLists-thunk";
const MyWordLists = () => {
  const dispatch = useDispatch();
  const {
    // loading,
    // error,
    // message,
    wordLists,
  } = useSelector((state) => state.wordLists);
  useEffect(() => {
    dispatch(getAllWordListsById());
    return () => {};
  }, [dispatch]);
  const renderWordList = wordLists.map((wordlist) => (
    <ListItem key={wordlist.id} wordlist={wordlist} />
  ));
  return (
    <Space className="MyWordLists">
      <Space
        className="
      MyWordLists__add"
      >
        <PlusOutlined />
      </Space>
      {renderWordList}
      {/* <ListItem /> */}
    </Space>
  );
};

export default MyWordLists;
