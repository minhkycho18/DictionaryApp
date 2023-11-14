import {Space, Tag} from "antd";
import React, {useState} from "react";
import "./ReviewCard.scss";
import {BsArrowReturnLeft, BsVolumeUp} from "react-icons/bs";
import WrapCard from "./WrapCard";
import waveBottom from "../../../assets/images/wave-bottom.svg";
import waveTop from "../../../assets/images/wave-top.svg";
import {upperFirst} from "lodash";
import colorPos from "../../../helpers/ColorPos";
import ReactCardFlip from "react-card-flip";

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
                            <Space className="review-card__title">{props?.vocabInfo?.word}</Space>
                            {/* <BsVolumeUp className="review-card__sound"></BsVolumeUp> */}
                        </Space>
                        {props?.vocabInfo?.phoneUs &&
                            <Space className="review-card__phonetic">
                                <span>{props?.vocabInfo?.phoneUs}</span> , <span>{props?.vocabInfo?.phoneUk}</span>
                            </Space>
                        }
                        <Tag
                            color={colorPos.get(props?.vocabInfo?.pos)}
                            style={{fontSize: "18px", margin: "20px 0 20px 0"}}
                        >
                            {upperFirst(props?.vocabInfo?.pos)}
                        </Tag>
                        <Space className="review-card__def">
                            {props?.vocabInfo?.wordDesc}
                        </Space>
                    </Space>

                    <Space
                        className="review-card__example"
                        onClick={() => props.onSelect && setIsFlip(!isFlip)}
                        style={{cursor: `${props.onSelect ? "pointer" : "default"}`}}
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
                        style={{justifyContent: "center", alignItems: "center"}}
                    >
                        <Space className="review-card__title--example review-card__title">
                            Examples
                        </Space>
                        <Space direction="vertical">
                            <Space className="review-card__example--item">
                                {props?.vocabInfo?.example}
                            </Space>
                        </Space>
                    </Space>
                    <Space
                        className="review-card__example"
                        onClick={() => setIsFlip(!isFlip)}
                    >
                        <BsArrowReturnLeft/> Back
                    </Space>
                </Space>
            </WrapCard>
        </ReactCardFlip>
    );
};

export default ReviewCard;
