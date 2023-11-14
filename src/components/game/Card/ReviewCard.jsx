import { Space, Tag } from "antd";
import React, { useState } from "react";
import "./ReviewCard.scss";
import { BsArrowReturnLeft, BsVolumeUp } from "react-icons/bs";
import WrapCard from "./WrapCard";
import waveBottom from "../../../assets/images/wave-bottom.svg";
import waveTop from "../../../assets/images/wave-top.svg";
import ReactCardFlip from "react-card-flip";
import colorPos from "../../../helpers/ColorPos";
import { upperFirst } from "lodash";
const ReviewCard = (props) => {
  const [isFlip, setIsFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <WrapCard {...props} imgTop={waveTop} imgBot={waveBottom}>
        <Space direction="vertical" className="review-card">
          <Space className="review-card__icon">
            <BsVolumeUp className="review-card__sound"></BsVolumeUp>
          </Space>
          <Space direction="vertical" className="review-card__body">
            <Space>
              <Space className="review-card__title">Hello</Space>
              {/* <BsVolumeUp className="review-card__sound"></BsVolumeUp> */}
            </Space>
            <Space className="review-card__phonetic">
              <span>/helu/</span>,<span>/helu/</span>
            </Space>
            <Tag
              color={colorPos.get(props?.vocab?.pos)}
              style={{ fontSize: "15px" }}
            >
              {upperFirst(props?.vocab?.pos)}
            </Tag>
            <Space className="review-card__pos">Verb</Space>
            <Space className="review-card__def">
              This is a test definition for front-end develop! This is a test
              definition for front-end develop! This is a test definition for
              front-end develop!This is a test definition for front-end develop!
              This is a test definition for front-end develop!
            </Space>
          </Space>

          <Space
            className="review-card__example"
            onClick={() => props.onSelect && setIsFlip(!isFlip)}
            style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
          >
            Click to see example
          </Space>
        </Space>
      </WrapCard>
      {/* //=================================================================================================== */}
      <WrapCard {...props} imgTop={waveTop} imgBot={waveBottom}>
        <Space direction="vertical" className="review-card">
          <Space className="review-card__icon">
            <BsVolumeUp className="review-card__sound"></BsVolumeUp>
          </Space>
          <Space
            direction="vertical"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Space className="review-card__title--example review-card__title">
              Examples
            </Space>
            <Space direction="vertical">
              <Space className="review-card__example--item">
                1. This is an example
              </Space>
              <Space className="review-card__example--item">
                2. This is an example
              </Space>
              <Space className="review-card__example--item">
                3. This is an example
              </Space>
            </Space>
          </Space>
          <Space
            className="review-card__example"
            onClick={() => setIsFlip(!isFlip)}
          >
            <BsArrowReturnLeft /> Back
          </Space>
        </Space>
      </WrapCard>
    </ReactCardFlip>
  );
};

export default ReviewCard;
