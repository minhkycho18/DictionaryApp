import {
  BookOutlined,
  InboxOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import "./Meaning.scss";
const Meaning = (props) => {
  const [isChoice, setIsChoice] = useState(false);
  const onChoice = (e) => {
    setIsChoice(!isChoice);
  };
  const renderDefinitions =
    props.definitions &&
    props.definitions.map((definition, index) => (
      <Space key={index} className="group-meaning">
        <Space className="meaning">
          <span className="meaning__content">
            <span className="meaning__content--num">{index + 1}.</span>{" "}
            {definition}
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
    ));
  return (
    <Space className="wrappered border border--lightblue" direction="vertical">
      <Space style={{ width: "100vh" }}>
        <h1>Meaning</h1>
      </Space>
      {renderDefinitions}
    </Space>
  );
};

export default Meaning;
