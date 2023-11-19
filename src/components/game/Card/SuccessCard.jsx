import { InboxOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import React from "react";
import logo from "../../../assets/images/Animation.svg";
import "./SuccessCard.scss";
import WrapCard from "./WrapCard";
const SuccessCard = (props) => {
  const changeToNextLesson = (lesson) => {
    props.handleChangeLesson(lesson, true);
  };
  const renderBody = () => {
    switch (props?.type) {
      case "success-review":
        return (
          <Space direction="vertical" className="success-card ">
            <Space direction="vertical" className="success-card__body">
              <Image
                src={logo}
                loading="lazy"
                preview={false}
                style={{ pointerEvents: "none" }}
              ></Image>
              <Space>
                <Space className="review-card__title">Success !</Space>
              </Space>

              <Space className="review-card__def">
                {props?.message} You've reviewed all the word in this lesson.
              </Space>
            </Space>
            <Button
              type="primary"
              onClick={() => changeToNextLesson("flashCard")}
            >
              Practice
            </Button>
          </Space>
        );
      case "success-flash_card":
        return (
          <Space direction="vertical" className="success-card ">
            <Space direction="vertical" className="success-card__body">
              <Image src={logo} loading="lazy" preview={false}></Image>
              <Space direction="vertical">
                {/* <Space className="review-card__title">Great !</Space> */}
                <Space className="review-card__title">
                  {props.onSelect &&
                    props?.resultLength -
                      props?.correctAnswerFlashcard.length}{" "}
                  Difficult words{" "}
                </Space>
              </Space>
              <Space className="success-card__box" direction="vertical">
                <Space className="success-card__options success-card__options--leitner">
                  <InboxOutlined className="success-card__options__icon" />
                  <Space direction="vertical">
                    <div className="success-card__options__title ">
                      Add to Leitner
                    </div>
                    <div className="success-card__options__desc ">
                      Review them everyday!
                    </div>
                  </Space>
                </Space>

                <Space
                  className="success-card__options success-card__options--continue"
                  onClick={() => changeToNextLesson("spelling")}
                >
                  Continue
                </Space>
              </Space>
            </Space>
          </Space>
        );
      case "success-spelling":
        return (
          <Space direction="vertical" className="success-card ">
            <Space direction="vertical" className="success-card__body">
              <Image src={logo} loading="lazy" preview={false}></Image>
              <Space direction="vertical">
                {/* <Space className="review-card__title">Great !</Space> */}
                <Space className="review-card__title">
                  {props.onSelect &&
                    props?.resultLength -
                      props?.correctAnswerFlashcard.length}{" "}
                  wrong answers{" "}
                </Space>
              </Space>
              <Space className="success-card__box" direction="vertical">
                <Space className="success-card__options success-card__options--leitner">
                  <InboxOutlined className="success-card__options__icon" />
                  <Space direction="vertical">
                    <div className="success-card__options__title ">
                      Add to Leitner
                    </div>
                    <div className="success-card__options__desc ">
                      Review them everyday!
                    </div>
                  </Space>
                </Space>

                <Space
                  className="success-card__options success-card__options--continue"
                  onClick={() => changeToNextLesson("quiz")}
                >
                  Continue
                </Space>
              </Space>
            </Space>
          </Space>
        );

      default:
        break;
    }
  };
  return (
    <WrapCard
      {...props}
      // imgTop={waveTop} imgBot={waveBottom}
    >
      {renderBody()}
    </WrapCard>
  );
};

export default SuccessCard;
