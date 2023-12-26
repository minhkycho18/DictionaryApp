import { Col, Image, Row, Space, Tag } from "antd";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import waveBottom from "../../../assets/images/wave-bottom.svg";
import waveTop from "../../../assets/images/wave-top.svg";
import colorPos from "../../../helpers/ColorPos";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import { upperFirst } from "lodash";
import { BsArrowReturnLeft } from "react-icons/bs";
import "./LeitnerCard.scss";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
const LeitnerCard = (props) => {
  const [isFlip, setIsFlip] = useState(false);
  const onChangeSlide = () => {
    props.onSelect && props.handleChangeSlide();
  };
  const changeLevelVocab = (statusLevel, value) => {
    props.changeLevelVocabulary(statusLevel, value);
  };
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <Space
        direction="vertical"
        className="leitner-card"
        style={{
          pointerEvents: `${props.onSelect ? "all" : "none"}`,
          opacity: `${props.onSelect ? 1 : 0.6}`,
        }}
      >
        <Image
          src={waveTop}
          preview={false}
          className="leitner-card__top"
          // width={300}
        />
        <Space className="leitner-card__icon">
          {props?.vocabInfo?.audioUk && (
            <BiSolidVolumeFull
              className="leitner-card__sound"
              onClick={() => new Audio(props?.vocabInfo?.audioUk).play()}
            />
          )}
          {!props?.vocabInfo?.audioUk && (
            <BiSolidVolumeMute
              className="leitner-card__sound"
              style={{ color: "#a9a8a8" }}
            />
          )}
        </Space>
        <Space direction="vertical" className="leitner-card__content">
          <Space direction="vertical" className="leitner-card__body">
            <Space className="leitner-card__title">
              {props?.vocabInfo?.word}
            </Space>

            {props?.vocabInfo?.phoneUs && (
              <Space className="leitner-card__phonetic">
                <span>{props?.vocabInfo?.phoneUs}</span> ,
                <span>{props?.vocabInfo?.phoneUk}</span>
              </Space>
            )}
            <Tag
              color={colorPos.get(props?.vocabInfo?.pos)}
              style={{ fontSize: "18px", margin: "20px 0 20px 0" }}
            >
              {upperFirst(props?.vocabInfo?.pos)}
            </Tag>
          </Space>
        </Space>
        <div className="leitner-card__bottom--click">
          <Space
            className="leitner-card__example"
            onClick={() => setIsFlip(!isFlip)}
          >
            Tap to see definition
          </Space>
          <Image
            src={waveBottom}
            preview={false}
            className="leitner-card__bottom"
          />
        </div>
      </Space>
      {/* {//=====================================================================================================} */}
      <Space
        direction="vertical"
        className="leitner-card"
        style={{
          pointerEvents: `${props.onSelect ? "all" : "none"}`,
          opacity: `${props.onSelect ? 1 : 0.6}`,
        }}
      >
        <Image
          src={waveTop}
          preview={false}
          className="leitner-card__top"
          // width={300}
        />
        <Space className="leitner-card__icon">
          {props?.vocabInfo?.audioUk && (
            <BiSolidVolumeFull
              className="leitner-card__sound"
              onClick={() => new Audio(props?.vocabInfo?.audioUk).play()}
            />
          )}
          {!props?.vocabInfo?.audioUk && (
            <BiSolidVolumeMute
              className="leitner-card__sound"
              style={{ color: "#a9a8a8" }}
            />
          )}
        </Space>
        <Space direction="vertical" className="leitner-card__content">
          <Space direction="vertical" className="leitner-card__body">
            <Space className="leitner-card__title--example leitner-card__title">
              Definition
            </Space>
            <Space className="leitner-card__definition">
              {props?.vocabInfo?.question}
            </Space>
          </Space>
          <Space
            className="leitner-card__options--back"
            onClick={() => setIsFlip(!isFlip)}
          >
            <BsArrowReturnLeft />
          </Space>
        </Space>

        <Row style={{ width: "400px" }}>
          <Col className="col-css" span={12} style={{ cursor: "pointer" }}>
            <Space
              className={`leitner-card__options--item leitner-card__unknown`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (!props?.vocabInfo?.result) {
                  changeLevelVocab("up", [
                    {
                      vocabId: props?.vocabInfo?.vocabId,
                      defId: props?.vocabInfo?.defId,
                    },
                  ]);
                } else
                  changeLevelVocab("down", [
                    {
                      vocabId: props?.vocabInfo?.vocabId,
                      defId: props?.vocabInfo?.defId,
                    },
                  ]);

                if (props.isLastItem) {
                  props.handleOpenModal(true);
                } else onChangeSlide();
              }}
            >
              <AiOutlineCloseCircle className="leitner-card__options--icon leitner-card__unknown--icon" />
              <span>Incorrect</span>
            </Space>
          </Col>
          <Col className="col-css" style={{ cursor: "pointer" }} span={12}>
            <Space
              className={`leitner-card__options--item leitner-card__know`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (props?.vocabInfo?.result) {
                  changeLevelVocab("up", [
                    {
                      vocabId: props?.vocabInfo?.vocabId,
                      defId: props?.vocabInfo?.defId,
                    },
                  ]);
                } else
                  changeLevelVocab("down", [
                    {
                      vocabId: props?.vocabInfo?.vocabId,
                      defId: props?.vocabInfo?.defId,
                    },
                  ]);
                if (props.isLastItem) {
                  props.handleOpenModal(true);
                } else onChangeSlide();
              }}
            >
              <AiOutlineCheckCircle className="leitner-card__options--icon leitner-card__know--icon" />
              <span>Correct</span>
            </Space>
          </Col>
        </Row>
      </Space>
    </ReactCardFlip>
  );
};

export default LeitnerCard;
