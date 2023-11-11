import React from "react";
import "./FlashCard.scss";
import WrapCard from "./WrapCard";
import waveTop from "../../../assets/images/wave-quiz-top.svg";
import waveBottom from "../../../assets/images/wave-quiz-bottom.svg";
const QuizCard = (props) => {
  return (
    <WrapCard {...props} imgTop={waveTop}>
      Quiz
    </WrapCard>
  );
};

export default QuizCard;
