import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Image, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import flashcard from "../../../assets/images/flashcard.svg";
import quiz from "../../../assets/images/quiz.svg";
import review from "../../../assets/images/review.svg";
import spelling from "../../../assets/images/spelling.svg";
import "./GameMenu.scss";
const REVIEW = "review";
const FLASH_CARD = "flashCard";
const QUIZ = "quiz";
const SPELLING = "spelling";

const GameMenu = (props) => {
  const navigate = useNavigate();
  const { isReview, isFlashcard, isQuiz, isSpelling } = useSelector(
    (state) => state.game
  );
  const handleChangeLesson = (lesson) => {
    props.onChangeLesson(lesson);
  };

  return (
    <Space className="game-menu__wrap">
      <Space
        className="game-menu game-menu__item--mobile"
        style={{ marginTop: 13, marginRight: 8 }}
        onClick={() => navigate(-1)}
      >
        <Space className="game-menu__item game-menu__item--back">
          <ArrowLeftOutlined style={{ fontSize: 25, marginTop: 12 }} />
          <div>Back</div>
        </Space>
      </Space>
      <Space.Compact className="game-menu">
        <Space
          className={`game-menu__item border-left ${
            props.lesson === REVIEW ? "game-menu__item--active" : ""
          } ${isReview ? "game-menu__item--success" : ""}`}
          onClick={() => handleChangeLesson(REVIEW)}
        >
          <CheckCircleFilled className="game-menu__item--checked" />
          <Image
            src={review}
            preview={false}
            width={25}
            style={{
              filter:
                "invert(16%) sepia(20%) saturate(367%) hue-rotate(197deg) brightness(90%) contrast(88%)",
            }}
          />
          <div>1. Review</div>
        </Space>
        <Space
          className={`game-menu__item ${
            props.lesson === FLASH_CARD ? "game-menu__item--active" : ""
          } ${isFlashcard ? "game-menu__item--success" : ""}`}
          onClick={() => handleChangeLesson(FLASH_CARD)}
        >
          <CheckCircleFilled className="game-menu__item--checked" />

          <Image src={flashcard} preview={false} width={25} />
          <div>2. Flashcard</div>
        </Space>
        <Space
          className={`game-menu__item ${
            props.lesson === SPELLING ? "game-menu__item--active" : ""
          } ${isSpelling ? "game-menu__item--success" : ""}`}
          onClick={() => handleChangeLesson(SPELLING)}
        >
          <CheckCircleFilled className="game-menu__item--checked" />
          <Image src={spelling} preview={false} width={25} />
          <div>3. Spelling</div>
        </Space>
        <Space
          className={` game-menu__item border-right ${
            props.lesson === QUIZ ? "game-menu__item--active" : ""
          } ${isQuiz ? "game-menu__item--success" : ""}`}
          // className="game-menu__item border-right game-menu__item--success"
          onClick={() => handleChangeLesson(QUIZ)}
        >
          <CheckCircleFilled className="game-menu__item--checked" />
          <Image src={quiz} preview={false} width={25} />
          <div>4. Quiz</div>
        </Space>
      </Space.Compact>
    </Space>
  );
};

export default GameMenu;
