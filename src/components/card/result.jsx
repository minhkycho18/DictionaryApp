import { Card } from "antd";
import React from "react";
import "./Result.scss";
const Result = (props) => {
  const selectedWord = (e) => {
    e.preventDefault();
    props.onSelect(props.result);
  };
  return (
    <Card className="result" onClick={selectedWord}>
      <h2 className="result__title">
        {props.index}. {props.result?.word}{" "}
      </h2>
      <p className="result__content">{props.result?.definitions[0]}</p>
    </Card>
  );
};

export default Result;
