import { CheckCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
import "./DefaultWord.scss";
const DefaultWord = () => {
  const { result } = useSelector((state) => state.search);
  //   const [isSelected, setIsSelected] = useState(true);
  const [inputWord, setInputWord] = useState("");
  const dispatch = useDispatch();
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      dispatch(getSearchResult(nextValue));
    }, 500)
  ).current;

  const renderSearchResult = result.map((word) =>
    word.definitions.map((definition) => (
      <div key={definition?.defId} className="wordWrap">
        <Space className="word">
          <Space className="word__content">{word?.word}</Space>
          <Space className="word__status">
            <CheckCircleFilled style={{ color: "green" }} />
            <span className="word__pos">[{word?.pos}]</span>
          </Space>
        </Space>
        <Space className="word__meaning">{definition.wordDesc}</Space>
      </div>
    ))
  );

  return (
    <Space className="mainSubcategory">
      <Input
        className="search__sub"
        placeholder="Search"
        prefix={
          <SearchOutlined style={{ color: "#bbb", padding: "0px 4px" }} />
        }
        value={inputWord}
        onChange={onChangeInput}
      ></Input>
      <Space direction="vertical" className="sub_content">
        {renderSearchResult}
      </Space>
    </Space>
  );
};

export default DefaultWord;
