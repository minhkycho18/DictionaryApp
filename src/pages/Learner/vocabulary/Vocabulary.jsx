import { Space } from "antd";
import React from "react";
import WordLists from "../../../components/word-lists/WordLists";
import "./Vocabulary.scss";
const Vocabulary = () => {
  return (
    <Space className="wrap mainwrap" direction="vertical" align="center">
      <Space className="vocab" wrap direction="vertical">
        <div className="vocab__title">English Vocabulary</div>
        <div className="vocab__intro">Categorized word lists</div>
      </Space>
      <Space className="word-wrap" direction="vertical">
        <WordLists />
        <WordLists />
        <WordLists />
      </Space>
    </Space>
  );
};

export default Vocabulary;
