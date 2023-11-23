import React, { useState } from "react";
import "./Overview.scss";
import quiz from "../../../assets/images/quiz.svg";
import spelling from "../../../assets/images/spelling.svg";
import flashcard from "../../../assets/images/flashcard.svg";

import { Image, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IncorrectItem from "./IncorrectItem";
const Overview = (props) => {
  const navigate = useNavigate();
  const { correctFlashcard, correctSpelling, correctQuiz } = useSelector(
    (state) => state.game
  );
  const [incorrectAnswer, setIncorrectAnswer] = useState([]);
  const [type, setType] = useState();
  const handleOpenIncorrect = (type) => {
    setType(type);
    if (type === "flashcard") {
      // console.log(correctFlashcard?.incorrect);
      setIncorrectAnswer(correctFlashcard?.incorrect);
    }
    if (type === "quiz") {
      // console.log(correctQuiz?.incorrect);
      setIncorrectAnswer(correctQuiz?.incorrect);
    }
    if (type === "spelling") {
      // console.log(correctSpelling?.incorrect);
      setIncorrectAnswer(correctSpelling?.incorrect);
    }
  };
  return (
    <Space
      className="overview"
      style={{
        justifyContent: `${incorrectAnswer.length > 0 ? "" : "center"}`,
      }}
      direction="vertical"
    >
      <Space className="overview__box" direction="vertical">
        <Space className="" direction="vertical" style={{ marginBottom: 32 }}>
          <Space className="overview__title">Well done!</Space>
          <Space className="overview__description">
            You have successfully finished the test.
          </Space>
        </Space>
        <Space className="overview__results">
          <Space className="overview__results__item">
            <Space
              className="overview__results__image"
              onClick={() => handleOpenIncorrect("flashcard")}
            >
              <Image src={flashcard} preview={false} width={25} />
            </Space>

            <Space direction="vertical">
              <Space className="overview__results__count">
                {correctFlashcard?.correct.length}/{correctFlashcard?.total}
              </Space>
              <Space className="overview__results__label">
                Correct answers
              </Space>
            </Space>
          </Space>

          <Space className="overview__results__item">
            <Space
              className="overview__results__image"
              onClick={() => handleOpenIncorrect("spelling")}
            >
              <Image src={spelling} preview={false} width={25} />
            </Space>

            <Space direction="vertical">
              <Space className="overview__results__count">
                {correctSpelling?.correct.length}/{correctSpelling?.total}
              </Space>
              <Space className="overview__results__label">
                Correct answers
              </Space>
            </Space>
          </Space>
          <Space className="overview__results__item">
            <Space
              className="overview__results__image"
              onClick={() => handleOpenIncorrect("quiz")}
            >
              <Image src={quiz} preview={false} width={25} />
            </Space>

            <Space direction="vertical">
              <Space className="overview__results__count">
                {correctQuiz?.correct.length}/{correctQuiz?.total}
              </Space>
              <Space className="overview__results__label">
                Correct answers
              </Space>
            </Space>
          </Space>
        </Space>
        <Space className="overview__results">
          <Space className="overview__link">
            See your result
            <RightOutlined />
          </Space>
          <Space
            className="overview__finish"
            onClick={() => {
              navigate(-1);
            }}
          >
            Finish
          </Space>
        </Space>
      </Space>
      <Space className="overview__incorrect">
        {incorrectAnswer &&
          incorrectAnswer.map((item, index) => (
            <IncorrectItem
              item={item}
              key={item.vocabId + "-" + item.defId + "-" + type + index}
              num={index + 1}
              type={type}
            />
          ))}
      </Space>
    </Space>
  );
};

export default Overview;
