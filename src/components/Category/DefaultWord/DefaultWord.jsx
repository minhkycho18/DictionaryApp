import { CheckCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { debounce } from "lodash";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
import "./DefaultWord.scss";
const DefaultWord = ({ vocabInSub, onAddVocab }) => {
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
  const checkValid = (vocabId, defId) => {
    const checkValid = vocabInSub.some(
      (vocab) => vocab.vocabId === vocabId && vocab.definition.defId === defId
    );
    return checkValid;
  };

  const handleAddVocab = (data) => {
    onAddVocab(data);
  };

  const renderSearchResult = result.map((word) =>
    word.definitions.map((definition) => (
      <div
        key={`${word.id}${definition.defId}`}
        className="wordWrap"
        onClick={() =>
          handleAddVocab({
            vocabId: word.id,
            defId: definition.defId,
          })
        }
      >
        <Space className="word">
          <Space className="word__content">{word?.word}</Space>
          <Space className="word__status">
            {checkValid(word.id, definition.defId) && (
              <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />
            )}
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
