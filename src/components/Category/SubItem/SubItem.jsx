import React, { useState } from "react";
import "./SubItem.scss";
import { Space } from "antd";
import ReactCardFlip from "react-card-flip";
import { DeleteOutlined } from "@ant-design/icons";
const SubItem = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Space className="subitem" direction="vertical">
        <Space className="subitem__pos">{props?.pos}verb</Space>
        <Space className="subitem__content" direction="vertical">
          <Space className="subitem__content__word">{props?.word}hello</Space>
          <Space className="subitem__content__phonetic">
            {props?.phoneUs}/ˈɫɔŋ/
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
