import React from "react";
import "./FlashCard.scss";
import WrapCard from "./WrapCard";
import waveTop from "../../../assets/images/wave3-top.svg";
import waveBottom from "../../../assets/images/wave3-bot.svg";
const FlashCard = (props) => {
  return (
    <WrapCard {...props} imgTop={waveTop} imgBot={waveBottom}>
      FlashCard
    </WrapCard>
  );
};

export default FlashCard;
