import { Space } from "antd";
import React from "react";
import "./ReviewCard.scss";
import { BsVolumeUp } from "react-icons/bs";
import WrapCard from "./WrapCard";
import waveBottom from "../../../assets/images/wave-bottom.svg";
import waveTop from "../../../assets/images/wave-top.svg";
const ReviewCard = (props) => {
  return (
    <WrapCard {...props} imgTop={waveTop} imgBot={waveBottom}>
      <Space>
        <Space className="review-card__title">Hello</Space>
        <BsVolumeUp className="review-card__sound"></BsVolumeUp>
      </Space>
      <Space className="review-card__phonetic">
        <span>/helu/</span>,<span>/helu/</span>
      </Space>
      <Space className="review-card__pos">Verb</Space>
      <Space className="review-card__def">
        This is a test definition for front-end develop! This is a test
        definition for front-end develop! This is a test definition for
        front-end develop!This is a test definition for front-end develop! This
        is a test definition for front-end develop!
      </Space>
    </WrapCard>
  );
};

export default ReviewCard;
