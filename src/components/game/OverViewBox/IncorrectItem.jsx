import { Space } from "antd";
import "./IncorrectItem.scss";
const IncorrectItem = ({ item, num, type }) => {
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
      <Space className="incorrectItem__def">
        {type === "flashcard" && (
          <span className="incorrectItem__def--flashcard">{item?.word}:</span>
        )}
        {item?.question + ""}
      </Space>
    </Space>
  );
};

export default IncorrectItem;
