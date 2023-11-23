import React, { useState } from "react";
import "./QuizCard.scss";
import WrapCard from "./WrapCard";
import waveTop from "../../../assets/images/wave-quiz-top.svg";
import { Button, Space } from "antd";
const QuizCard = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };
  const changeToNext = () => {
    props.onSelect && props.handleChangeSlide();
  };
  const handleConfirmAnswer = () => {
    if (props.vocabInfo.result[`${selectedAnswer}`]) {
      props.handleCorrectFlashCard(props.vocabInfo);
    } else {
      const item = {
        myAnswer: selectedAnswer,
        ...props.vocabInfo,
      };
      props.handleIncorrectAnswer(item);
    }
    changeToNext();
  };
  const arrResult =
    (props.vocabInfo.result && Object.entries(props?.vocabInfo?.result)) || [];
  const renderResults = arrResult.map(([key, value], index) => (
    <Space
      key={index}
      className={`quiz-card__options__item ${
        selectedAnswer === key ? "quiz-card__options__item--selected" : ""
      }`}
      onClick={() => handleSelectAnswer(key)}
    >
      {key}
    </Space>
  ));
  return (
    <WrapCard {...props} imgTop={waveTop} type={"quiz"}>
      <Space className="spelling-card" direction="vertical">
        <Space direction="vertical" className="spelling-card__header">
          <Space direction="vertical" className="spelling-card__title">
            Which is correct ?
          </Space>
          <Space direction="vertical" className="spelling-card__definition">
            {'"' + props?.vocabInfo?.question + '"'}
          </Space>
        </Space>

        <Space direction="vertical" className="quiz-card__body">
          <Space style={{ margin: 32, fontWeight: 600 }}>Your Answer:</Space>
          <Space className="quiz-card__options" direction="vertical">
            {props?.vocabInfo?.result && renderResults}
          </Space>
        </Space>
        <Space style={{ width: "313px", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            direction="vertical"
            className="quiz-card__btn"
            onClick={handleConfirmAnswer}
            style={{
              pointerEvents: `${selectedAnswer ? "all" : "none"}`,
              opacity: `${selectedAnswer ? 1 : 0.6}`,
            }}
          >
            Done
          </Button>
        </Space>
      </Space>
    </WrapCard>
  );
};

export default QuizCard;
