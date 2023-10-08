import { Avatar, Col, Divider, Input, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import en from "../../../assets/images/en-circle.png";
import Result from "../../../components/card/result";
import Phonetic from "../../../components/Words/Phonetic";
import "./Dictionary.scss";

import { SearchOutlined } from "@ant-design/icons";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
const Dictionary = () => {
  const { result } = useSelector((state) => state.search);
  const [isSelected, setIsSelected] = useState(true);
  const [inputWord, setInputWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
  };
  const defaultWord = () => {
    setIsSelected(true);
    dispatch(getSearchResult("hello"));
    setWordMeaning(result[0]);
  };
  // useEffect(() => {
  //   setIsSelected(true);
  //   dispatch(getSearchResult("hello"));
  //   setWordMeaning(result[0]);
  // });

  useEffect(() => {
    const processInput = (value) => {
      if (value) {
        setIsSelected(false);
        dispatch(getSearchResult(value));
      } else {
        defaultWord();
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
    setInputWord("");
    navigate(`/dictionary?entry=${result?.word}`);
    setIsSelected(true);
    setWordMeaning(result);
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
          <Phonetic content={wordMeaning} />
        </Space>
      ) : (
        <Space>
          <Row gutter={[32, 16]}>{items && items}</Row>
        </Space>
      )}
    </Content>
  );
};

export default Dictionary;
