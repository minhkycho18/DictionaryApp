import { Col, Row, Space, Tag } from "antd";
import { upperFirst } from "lodash";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import { BsArrowReturnLeft } from "react-icons/bs";
import waveBottom from "../../../assets/images/wave-flash-bottom.svg";
import waveTop from "../../../assets/images/wave-flash-top.svg";
import colorPos from "../../../helpers/ColorPos";
import "./FlashCard.scss";
import WrapCard from "./WrapCard";
const FlashCard = (props) => {
  const [isFlip, setIsFlip] = useState(false);

  const changeToNext = () => {
    props.onSelect && props.handleChangeSlide();
  };
  const handleCheckCorrect = (answer) => {
    if (answer === props.vocabInfo.result) {
      props.handleCorrectFlashCard(props.vocabInfo);
    } else {
      const item = {
        myAnswer: answer,
        ...props.vocabInfo,
      };
      props.handleIncorrectAnswer(item);
    } 
  };
  const flipCard = () => {
    setIsFlip(!isFlip);
  };

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <WrapCard
        {...props}
        imgTop={waveTop}
        imgBot={waveBottom}
        handleFlipCard={flipCard}
      >
        <Space
          direction="vertical"
          className="flash-card"
          style={{ padding: 32 }}
        >
          <Space className="review-card__icon">
            {props?.vocabInfo?.audioUk && (
              <BiSolidVolumeFull
                className="review-card__sound"
                onClick={() => new Audio(props?.vocabInfo?.audioUk).play()}
              />
            )}
            {!props?.vocabInfo?.audioUk && (
              <BiSolidVolumeMute
                className="review-card__sound"
                style={{ color: "#a9a8a8" }}
              />
            )}
          </Space>
          <Space direction="vertical" className="review-card__body">
            <Space className="review-card__title">
              {props?.vocabInfo?.word}
            </Space>
            <Tag
              color={colorPos.get(props?.vocabInfo?.pos)}
              style={{ fontSize: "18px", margin: "20px 0 20px 0" }}
            >
              {upperFirst(props?.vocabInfo?.pos)}
            </Tag>

            {/* <Space className="review-card__pos">Verb</Space> */}
          </Space>
          <Space
            className="flash-card__example"
            onClick={() => props.onSelect && setIsFlip(!isFlip)}
            style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
          >
            Tap to see definition
          </Space>
        </Space>
      </WrapCard>
      {/* //=================================================================================================== */}
      <WrapCard {...props} imgTop={waveTop}>
        <Space direction="vertical" className="flash-card">
          <Space className="review-card__icon">
            {props?.vocabInfo?.audioUk && (
              <BiSolidVolumeFull
                className="review-card__sound"
                onClick={() => new Audio(props?.vocabInfo?.audioUk).play()}
              />
            )}
            {!props?.vocabInfo?.audioUk && (
              <BiSolidVolumeMute
                className="review-card__sound"
                style={{ color: "#a9a8a8" }}
              />
            )}
          </Space>
          <Space direction="vertical" className="review-card__body">
            <Space className="review-card__title--example review-card__title">
              Definition
            </Space>
            <Space className="flash-card__definition">
              {props?.vocabInfo?.question}
            </Space>
          </Space>
          <Space
            className="flash-card__options--back"
            onClick={() => props.onSelect && setIsFlip(!isFlip)}
            style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
          >
            <BsArrowReturnLeft style={{ padding: 8 }} />
          </Space>
          <Row style={{ width: 482 }}>
            <Col className="col-css" span={12}>
              <Space
                className="flash-card__options--item flash-card__unknown"
                onClick={() => {
                  handleCheckCorrect(false);
                  changeToNext();
                }}
                style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
              >
                <AiOutlineCloseCircle className="flash-card__options--icon flash-card__unknown--icon" />
                <span>False</span>
              </Space>
            </Col>
            <Col className="col-css" span={12}>
              <Space
                className="flash-card__options--item flash-card__know"
                onClick={() => {
                  handleCheckCorrect(true);
                  changeToNext();
                }}
                style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
              >
                <AiOutlineCheckCircle className="flash-card__options--icon flash-card__know--icon" />
                <span>True</span>
              </Space>
            </Col>
          </Row>
        </Space>
      </WrapCard>
    </ReactCardFlip>
  );
};

export default FlashCard;
