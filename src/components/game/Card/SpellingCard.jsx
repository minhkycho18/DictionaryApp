import React from "react";
import "./FlashCard.scss";
import WrapCard from "./WrapCard";
import waveTop from "../../../assets/images/wave-spell-top.svg";
const SpellingCard = (props) => {
  return (
    <WrapCard {...props} imgTop={waveTop}>
      Spelling nef ba
    </WrapCard>
  );
};

export default SpellingCard;
