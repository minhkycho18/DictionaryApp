import { RightOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Space } from "antd";
import React, { useMemo, useState } from "react";
import waveTop from "../../../assets/images/wave-spell.svg";
import hintImage from "../../../assets/images/hint.png";
import "./SpellingCard.scss";
import WrapCard from "./WrapCard";
import shuffleArray from "../../../helpers/shuffleArray";
const SpellingCard = (props) => {
  const initWord = props?.vocabInfo?.word;
  const emptyArray = Array(initWord.length).fill("");
  const [confirmed, setConfirmed] = useState(false);
  const [input, setInputWord] = useState("");
  const [inputValues, setInputValues] = useState(emptyArray);
  const [form] = Form.useForm();
  const [hint, setHint] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  //======================================================================
  const handleChangeHintOptions = () => {
    if (hint > 2) {
      setHint(2);
    } else setHint(hint + 1);
  };
  //======================================================================
  const changeToNext = () => {
    props.onSelect && props.handleChangeSlide();
  };
  //======================================================================

  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
  };
  //======================================================================

  const handleChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (index < initWord.length - 1 && value !== "") {
      const nextInput = document.getElementById(
        `input-${props?.indexKey}-${index + 2}`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  const handleButtonClick = (char, index) => {
    const newInputValues = [...inputValues];
    const emptyIndex = newInputValues.indexOf("");

    if (emptyIndex !== -1) {
      newInputValues[emptyIndex] = char;
      setInputValues(newInputValues);
      const nextEmptyIndex = newInputValues.indexOf("", emptyIndex + 1);
      if (nextEmptyIndex !== -1) {
        const nextInput = document.getElementById(
          `input-${props?.indexKey}-${nextEmptyIndex + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      } else if (nextEmptyIndex === -1) {
        const nextInput = document.getElementById(
          `input-${props?.indexKey}-${initWord.length}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && index >= 0 && inputValues[index] === "") {
      const prevInput = document.getElementById(
        `input-${props?.indexKey}-${index}`
      );
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  //======================================================================

  const renderInput = () => {
    switch (hint) {
      case 0:
        return (
          <Input
            className={`${
              confirmed ? "spelling-card__input--confirmed" : ""
            } spelling-card__input`}
            value={input}
            onChange={onChangeInput}
            spellCheck={false}
            disabled={confirmed}
          />
        );
      case 1:
        return inputValues.map((value, index) => (
          <Input
            className={`
            ${value.length > 0 ? "spelling-card__input--yellow" : ""} ${
              confirmed ? "spelling-card__input--confirmed" : ""
            } spelling-card__input`}
            style={{ width: "40px", margin: 4 }}
            key={index}
            id={`input-${props?.indexKey}-${index + 1}`}
            maxLength={1}
            spellCheck={false}
            disabled={confirmed}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ));
      case 2:
        return inputValues.map((value, index) => (
          <Input
            className={`
            ${value.length > 0 ? "spelling-card__input--yellow" : ""} ${
              confirmed ? "spelling-card__input--confirmed" : ""
            } spelling-card__input`}
            style={{ width: "40px", margin: 4 }}
            key={index}
            id={`input-${props?.indexKey}-${index + 1}`}
            maxLength={1}
            spellCheck={false}
            disabled={confirmed}
            value={value}
            onChange={(e) => {
              handleChange(index, e.target.value);
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ));
      default:
        setHint(2);
    }
  };
  const renderClassCheck = confirmed && `spelling-card__answer--${isAnswered}`;
  const renderRandom = useMemo(
    () => shuffleArray(initWord.split("")),
    [initWord]
  );
  const renderShuffleWordChoice = renderRandom.map((letter, index) => (
    <Space
      className="spelling-card__input spelling-card__btn"
      key={index}
      style={{
        width: "40px",
        cursor: "pointer",
        justifyContent: "center",
        alignItems: "center",
      }}
      id={`btn-${props?.indexKey}-${index}`}
      onClick={() => handleButtonClick(letter, index)}
    >
      {letter}
    </Space>
  ));
  const renderWordChoice = [...renderShuffleWordChoice];
  //======================================================================

  const handleConfirm = (e) => {
    if (hint) {
      const newValues = inputValues.join("").toString();
      const isCorrect = newValues === initWord;
      setIsAnswered(isCorrect);
      if (isCorrect) {
        props.handleCorrectFlashCard(props.vocabInfo);
      } else {
        const item = {
          myAnswer: newValues,
          ...props.vocabInfo,
        };
        props.handleIncorrectAnswer(item);
      }
    }
    if (hint === 0) {
      const isCorrect = e.answer.toString() === initWord;
      setIsAnswered(isCorrect);
      if (isCorrect) {
        props.handleCorrectFlashCard(props.vocabInfo);
      } else {
        const item = {
          myAnswer: e.answer.toString(),
          ...props.vocabInfo,
        };
        props.handleIncorrectAnswer(item);
      }
    }

    setConfirmed(!confirmed);
  };
  //======================================================================
  return (
    <WrapCard {...props} imgTop={waveTop} type={"spelling"}>
      <Space className="spelling-card" direction="vertical">
        <Space direction="vertical" className="spelling-card__header">
          <Space direction="vertical" className="spelling-card__title">
            Spell it!
          </Space>
          <Space className="spelling-card__definition">
            {'"' + props?.vocabInfo?.wordDesc + ' "'}
          </Space>
        </Space>

        <Space
          direction="vertical"
          className={`${renderClassCheck} spelling-card__answer`}
        >
          {!confirmed ? "Your answer?" : initWord}
        </Space>

        <Form
          direction="vertical"
          style={{
            marginBottom: `${initWord.length > 8 && hint === 2 ? 0 : 64}px`,
            width: "482px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          form={form}
          onFinish={handleConfirm}
        >
          <Form.Item
            name="answer"
            style={{
              padding: "0px 32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {renderInput()}
          </Form.Item>
          <Space
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 32,
            }}
          >
            <Button
              type="secondary"
              className={`${
                confirmed ? "spelling-card__hint--disable" : ""
              } spelling-card__hint`}
              onClick={handleChangeHintOptions}
            >
              <span>Hint</span>
              <Image
                src={hintImage}
                preview={false}
                loading="lazy"
                width={24}
                className="spelling-card__icon"
              />
            </Button>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={`
                ${
                  input.length > 0 || inputValues.join("").length > 0
                    ? ""
                    : "spelling-card__confirm--disable"
                } 
                spelling-card__confirm 
                ${confirmed ? "spelling-card__confirm--confirmed" : ""}
                `}
              >
                Confirm
              </Button>
            </Form.Item>
            <Button
              type="secondary"
              className={`
              ${
                confirmed
                  ? "spelling-card__next"
                  : "spelling-card__next--disable"
              }
                `}
              onClick={changeToNext}
            >
              <span>Next</span>
              <RightOutlined className="spelling-card__icon--next" />
            </Button>
          </Space>
          <Space
            style={{
              padding: "0px 32px",
              display: "flex",
              flexWrap: "wrap",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {hint === 2 && renderWordChoice}
          </Space>
        </Form>
      </Space>
    </WrapCard>
  );
};

export default SpellingCard;
