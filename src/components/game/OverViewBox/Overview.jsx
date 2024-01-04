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
      setIncorrectAnswer(correctFlashcard?.incorrect);
    }
    if (type === "quiz") {
      setIncorrectAnswer(correctQuiz?.incorrect);
    }
    if (type === "spelling") {
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
          <Space
            className="overview__results__item"
            onClick={() => handleOpenIncorrect("flashcard")}
          >
            <Space className="overview__results__image rotate-scale-up-diag-2">
              <Image src={flashcard} preview={false} width={32} />
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

          <Space
            className="overview__results__item "
            onClick={() => handleOpenIncorrect("spelling")}
          >
            <Space className="overview__results__image rotate-scale-up-diag-2">
              <Image src={spelling} preview={false} width={32} />
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
          <Space
            className="overview__results__item"
            onClick={() => handleOpenIncorrect("quiz")}
          >
            <Space className="overview__results__image rotate-scale-up-diag-2">
              <Image src={quiz} preview={false} width={32} />
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
            {/* Click tag to see your result.
             */}{" "}
            {/* <RightOutlined /> */}
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
