import { Space } from "antd";
import "./IncorrectItem.scss";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
const IncorrectItem = ({ item, num, type }) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Space className="incorrectItem" direction="vertical">
      <Space className="incorrectItem__result">
        <Space className="incorrectItem__result__init">
          <span className="incorrectItem__result__index">{num}.</span>
          Correct:
          <span className="incorrectItem__result__init--true">
            {type === "flashcard" ? item?.result + "" : item?.word}
          </span>
        </Space>
        <Space className="incorrectItem__result__answer">
          Your answer:
          <span className="incorrectItem__result__answer--false">
            {item?.myAnswer + ""}
          </span>
        </Space>
      </Space>
      <Space className={`incorrectItem__def `}>
        {type === "flashcard" && (
          <span
            className={`incorrectItem__def--flashcard`}
            style={{ textDecoration: "none" }}
          >
            {item?.word}:
          </span>
        )}
        <span
          className={`${
            item?.result === false ? "incorrectItem__def--" + item?.result : ""
          }`}
        >
          {type === "spelling" ? item?.wordDesc : item?.question + ""}
        </span>
      </Space>
      {item?.result === false && type === "flashcard" && (
        <Space
          className={`overview__link animation-rotate `}
          onClick={() => setIsShow(!isShow)}
        >
          See correct definition
          <RightOutlined
            className={`${isShow ? "rotate-90-cw" : ""}`}
          />
        </Space>
      )}

      {isShow && (
        <Space className="incorrectItem__def--true incorrectItem__def ">
          {type === "spelling" ? item?.wordDesc : item?.answer + ""}
        </Space>
      )}
    </Space>
  );
};

export default IncorrectItem;
