import { PlusOutlined } from "@ant-design/icons";
import { Space, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListItem from "../../../components/my-word-lists/ListItem";
import { getAllWL } from "../../../stores/word-lists/wordLists-thunk";
import "./MyWordLists.scss";
const MyWordLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, wordLists } = useSelector((state) => state.wordLists);
  useEffect(() => {
    dispatch(getAllWL());
    return () => {};
  }, [dispatch]);
  const handleSelectWordList = (wordlist) => {
    navigate(`/dashboard/wordLists/${wordlist?.title}/${wordlist?.id}`);
  };
  const renderWordList = wordLists.map((wordlist) => (
    <ListItem
      key={wordlist.id}
      wordlist={wordlist}
      onSelect={handleSelectWordList}
    />
  ));
  return (
    <Space className={`MyWordLists ${loading ? "loading-css" : ""}`}>
      {!loading ? (
        <>
          <Space
            className="
      MyWordLists__add"
          >
            <PlusOutlined />
          </Space>
          {renderWordList}
        </>
      ) : (
        <Spin spinning={loading} />
      )}
    </Space>
  );
};

export default MyWordLists;
