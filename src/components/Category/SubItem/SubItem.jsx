import React, { useState } from "react";
import "./SubItem.scss";
import { Space } from "antd";
import ReactCardFlip from "react-card-flip";
import { DeleteOutlined } from "@ant-design/icons";
const SubItem = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const posColor = () => {
    switch (props?.vocab.pos) {
      case "noun":
        return "pos__color--noun";

      case "verb":
        return "pos__color--verb";
      default:
        return "pos__color--adj";
    }
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Space className="subitem" direction="vertical">
        <Space className={`subitem__pos ${posColor()}`}>
          {props?.vocab.pos}
        </Space>
        <Space className="subitem__content" direction="vertical">
          <Space className="subitem__content__word">{props?.vocab?.word}</Space>
          <Space className="subitem__content__phonetic">
            {props?.vocab?.phoneUs || props?.vocab?.phoneUk}
          </Space>
        </Space>
        <Space
          className="subitem__btn__select subitem__btn"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          Tap to delete!
        </Space>
      </Space>

      <Space className="subitem" direction="vertical">
        <Space>Delete this ?</Space>
        <Space className="subitem__btn subitem__btn__delete">
          <DeleteOutlined />
        </Space>
        <Space
          className="subitem__btn__cancel subitem__btn"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          Cancel
        </Space>
      </Space>
    </ReactCardFlip>
  );
};

export default SubItem;
