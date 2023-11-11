import React, { useState } from "react";
import "./FlashCard.scss";
import WrapCard from "./WrapCard";
import waveTop from "../../../assets/images/wave-flash-top.svg";
import waveBottom from "../../../assets/images/wave-flash-bottom.svg";
import { Affix, Col, Row, Space, Tag } from "antd";
import colorPos from "../../../helpers/ColorPos";
import { upperFirst } from "lodash";
import { BsArrowReturnLeft, BsVolumeUp } from "react-icons/bs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import ReactCardFlip from "react-card-flip";
import { RiArrowGoBackLine } from "react-icons/ri";
const FlashCard = (props) => {
  const [isFlip, setIsFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal">
      <WrapCard {...props} imgTop={waveTop} imgBot={waveBottom}>
        <Space
          direction="vertical"
          className="flash-card"
          style={{ padding: 32 }}
        >
          <Space className="review-card__icon">
            <BsVolumeUp className="review-card__sound"></BsVolumeUp>
          </Space>
          <Space direction="vertical" className="review-card__body">
            <Space className="review-card__title">Hello</Space>
            <Tag
              color={colorPos.get(props?.vocab?.pos)}
              style={{ fontSize: "15px" }}
            >
              {upperFirst(props?.vocab?.pos)}
            </Tag>
            <Space className="review-card__pos">Verb</Space>
          </Space>
          <Space
            className="review-card__example"
            onClick={() => props.onSelect && setIsFlip(!isFlip)}
            style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
          >
            Tap to see definition
          </Space>
        </Space>
      </WrapCard>
      <WrapCard {...props} imgTop={waveTop}>
        <Space direction="vertical" className="flash-card">
          <Space className="review-card__icon">
            <BsVolumeUp className="review-card__sound"></BsVolumeUp>
          </Space>
          <Space direction="vertical" className="review-card__body">
            <Space className="review-card__title--example review-card__title">
              Definition
            </Space>
            <Space className="review-card__example--item">
              to pursue wild animals in order to kill or catch them, for sport
              or food
            </Space>
          </Space>
          {/* <Space
            className="flash-card__options"
            onClick={() => props.onSelect && setIsFlip(!isFlip)}
            style={{ cursor: `${props.onSelect ? "pointer" : "default"}` }}
          > */}
          <Space
            className="flash-card__options--back"
            onClick={() => props.onSelect && setIsFlip(!isFlip)}
          >
            <BsArrowReturnLeft style={{ padding: 8 }} />
          </Space>
          <Row style={{ width: 482 }}>
            <Col className="col-css" span={12}>
              <Space className="flash-card__options--item flash-card__unknown">
                <AiOutlineCloseCircle className="flash-card__options--icon flash-card__unknown--icon" />
                <span>Didn't know it</span>
              </Space>
            </Col>
            <Col className="col-css" span={12}>
              <Space className="flash-card__options--item flash-card__know">
                <AiOutlineCheckCircle className="flash-card__options--icon flash-card__know--icon" />
                <span> Knew it</span>
              </Space>
            </Col>
          </Row>
        </Space>
        {/* </Space> */}
      </WrapCard>
    </ReactCardFlip>
  );
};

export default FlashCard;
