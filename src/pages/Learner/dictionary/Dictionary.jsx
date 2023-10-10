import { Avatar, Col, Divider, Input, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import en from "../../../assets/images/en-circle.png";
import Phonetic from "../../../components/Words/Phonetic";
import Result from "../../../components/card/result";
import "./Dictionary.scss";

import { SearchOutlined } from "@ant-design/icons";
import { setMeaningWord } from "../../../stores/search-word/searchSlice";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
const Dictionary = () => {
  const { result, selectedMeaning } = useSelector((state) => state.search);
  const [isSelected, setIsSelected] = useState(true);
  const [inputWord, setInputWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
  };

  useEffect(() => {
    const processInput = (value) => {
      if (value) {
        setIsSelected(false);
        dispatch(getSearchResult(value));
      }
    };

    const debounceTimeout = setTimeout(() => {
      processInput(inputWord);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [dispatch, inputWord]);
  const handleSelectWord = (result) => {
    navigate(`/dictionary?entry=${result?.word}`);
    setInputWord("");
    setIsSelected(true);
    dispatch(setMeaningWord(result));
  };

  const items = result.map((item, index) => (
    <Col key={index} span={result.length < 2 ? 24 : 12}>
      <Result result={item} index={++index} onSelect={handleSelectWord} />
    </Col>
  ));
  return (
    <Content className="contentdic">
      <Space wrap className="search font align-center">
        <Input
          className="search__box font"
          size="large"
          placeholder="SEARCH FOR A WORD"
          prefix={<SearchOutlined size={28} style={{ paddingRight: "8px" }} />}
          style={{
            backgroundColor: "transparent",
          }}
          value={inputWord}
          onChange={onChangeInput}
        />
        <Space className="language fontmain">
          <span className="fontmain">EN</span>

          <Divider
            type="vertical"
            style={{
              backgroundColor: "#ccc",
              margin: 0,
              height: "28px",
            }}
            className=""
          ></Divider>
          <Avatar src={en} className="language__flag"></Avatar>
        </Space>
      </Space>
      {isSelected ? (
        <Space>
          <Phonetic content={selectedMeaning} />
        </Space>
      ) : (
        <Space>
          <Row gutter={[32, 16]}>{result.length > 0 ? items : "NotFound"}</Row>
        </Space>
      )}
    </Content>
  );
};

export default Dictionary;
