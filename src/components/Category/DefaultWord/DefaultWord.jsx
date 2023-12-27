import { CheckCircleFilled, SearchOutlined } from "@ant-design/icons";
import { Empty, Input, Space } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
import "./DefaultWord.scss";
const DefaultWord = ({
  vocabInSub,
  onAddVocab,
  isOpen,
  inputWordDefault,
  setInputWordDefault,
}) => {
  const { result } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  useEffect(() => {
    setInputWordDefault(""); // Clear the input when the modal is closed
    return () => {
      setInputWordDefault("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWordDefault(newValue);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      dispatch(getSearchResult({ keyword: nextValue, offset: 0 }));
    }, 500)
  ).current;
  const checkValid = (vocabId, defId) => {
    return vocabInSub.some(
      (vocab) => vocab.vocabId === vocabId && vocab.definition.defId === defId
    );
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
            word: word,
            definition: definition,
            isAdded: checkValid(word.id, definition.defId),
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
        value={inputWordDefault}
        onChange={onChangeInput}
      />
      <Space direction="vertical" className="sub_content">
        {renderSearchResult && renderSearchResult}
        {!inputWordDefault && <Empty description={false} />}
      </Space>
    </Space>
  );
};

export default DefaultWord;
