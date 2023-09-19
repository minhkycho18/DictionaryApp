import {
  BookOutlined,
  InboxOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import "./Meaning.scss";
// import { useSelector } from "react-redux";
const Meaning = () => {
  // const { word } = useSelector((state) => state.search);
  const [isChoice, setIsChoice] = useState(false);
  const onChoice = (e) => {
    setIsChoice(!isChoice);
  };
  return (
    <Space className="wrappered border border--lightblue" direction="vertical">
      <Space style={{ borderBottom: "1px solid #ccc", width: "100vh" }}>
        <h1>Meaning</h1>
      </Space>
      <Space className="meaning">
        <span className="meaning__content">
          <span className="meaning__content--num">1.</span> a tropical fruit
          with a sweet and juicy flesh, similar to a lychee, and it is native to
          Southeast Asia
        </span>
      </Space>
      <Space className="synonyms"></Space>
      <Space className="choice">
        <div
          className={`choice__item ${isChoice ? "icon--active" : ""}`}
          onClick={onChoice}
        >
          <InboxOutlined className="choice__icon " />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
        <div className="choice__item">
          <BookOutlined className="choice__icon" />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
      </Space>
    </Space>
  );
};

export default Meaning;
