import { Card, Space } from "antd";
import React from "react";
import "./Result.scss";
const Result = (props) => {
  const selectedWord = (e) => {
    e.preventDefault();
    props.onSelect(props.result?.word);
  };
  return (
    <Card className="result" onClick={selectedWord}>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="result__title">
          {props.index}. {props.result?.word}{" "}
        </h2>
        <span className="result__pos">[{props.result?.pos}]</span>
      </Space>

      <p className="result__content">{props.result?.definitions[0].wordDesc}</p>
    </Card>
  );
};

export default Result;
