import {
  BookOutlined,
  InboxOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import "./Meaning.scss";
const Meaning = ({ detail }) => {
  const [isChoice, setIsChoice] = useState(false);
  const onChoice = (e) => {
    setIsChoice(!isChoice);
  };

  const renderDefinitions = detail.definitions.map((definition, index) => (
    <div key={definition.defId} className="group-meaning">
      <div className="meaning__content">
        <span className="meaning__content--num">{index + 1}.</span>{" "}
        <span>{definition.wordDesc}</span>
      </div>
      {definition.synonyms.length > 0 && (
        <Space className="synonyms">
          <span>Synonyms:</span>
          {definition?.synonyms.map((synonym, index) => (
            <span key={index} className="synonyms__word">
              {synonym}
            </span>
          ))}
        </Space>
      )}
      <Space className="choice">
        <div
          className={`choice__item ${
            definition?.isWordOfUserLeitner ? "icon--active" : ""
          }`}
          onClick={onChoice}
        >
          <InboxOutlined className="choice__icon " />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
        <div
          className={`choice__item ${
            definition?.isWordOfUserWordList ? "icon--active" : ""
          }`}
        >
          <BookOutlined className="choice__icon" />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
      </Space>
    </div>
  ));
  const posClass = () => {
    switch (detail.pos) {
      case "adverb":
        return "border--lightblue";
      case "verb":
        return "border--orange";
      case "adjective":
        return "border--pink";

      default:
        return "border--lightblue";
    }
  };
  return (
    <Space className={`wrap-meaning border ${posClass()}`} direction="vertical">
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <h1>{detail.word}</h1>
        <p style={{ fontSize: 20, fontWeight: 500 }}>[{detail.pos}]</p>
      </Space>
      <Space className="meaning__content" direction="vertical">
        {renderDefinitions}
      </Space>
    </Space>
  );
};

export default Meaning;
