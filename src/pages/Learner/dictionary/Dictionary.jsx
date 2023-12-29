import { Avatar, Col, Divider, Empty, Input, Row, Space, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import en from "../../../assets/images/en-circle.png";
import Phonetic from "../../../components/Words/Phonetic";
import Result from "../../../components/card/result";
import "./Dictionary.scss";

import { ArrowDownOutlined, SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { setVocabDetails } from "../../../stores/search-word/searchSlice";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
const Dictionary = () => {
  const { result, selectedMeaning, loading } = useSelector(
    (state) => state.search
  );
  const [isSelected, setIsSelected] = useState(true);
  const [inputWord, setInputWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayedItems, setDisplayedItems] = useState(10);
  const contentRef = useRef(null);
  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = () => {
    const content = contentRef.current;
    if (content) {
      const isBottom =
        content.getBoundingClientRect().bottom <= window.innerHeight;
      setIsBottom(isBottom);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isBottom && !isSelected) {
      const loadMoreItems = () => {
        const newDisplayedItems = displayedItems + 10;
        setDisplayedItems(newDisplayedItems);
        dispatch(
          getSearchResult({
            keyword: inputWord,
            offset: 0,
            limit: newDisplayedItems,
          })
        );
      };
      loadMoreItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
    setDisplayedItems(10);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      setIsSelected(false);
      setDisplayedItems(10);
      dispatch(
        getSearchResult({
          keyword: nextValue,
          offset: 0,
          limit: displayedItems,
        })
      );
    }, 500)
  ).current;

  useEffect(() => {
    if (!selectedMeaning && result) {
      setIsSelected(false);
    }
  }, [result, selectedMeaning]);

  const handleSelectWord = (result) => {
    navigate(`/dictionary?entry=${result}`);
    setInputWord("");
    setIsSelected(true);
    dispatch(setVocabDetails(result));
  };

  const items = result.map((item, index) => (
    <Col key={index} span={result.length < 2 ? 24 : 12}>
      <Result result={item} index={++index} onSelect={handleSelectWord} />
    </Col>
  ));
  return (
    <Content className="contentdic" ref={contentRef}>
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
      {!loading && isSelected ? (
        <Space>
          <Phonetic />
        </Space>
      ) : (
        <Space>
          <Row gutter={[32, 16]}>
            {result.length > 0 && items}
            {result.length <= 0 && !loading && (
              <Empty
                description={<span className="notfound">Not Found</span>}
              />
            )}
          </Row>
        </Space>
      )}
      {result.length >= 10 && !loading && (
        <Space style={{ marginTop: 16 }}>
          <ArrowDownOutlined
            style={{
              fontSize: 24,
              color: "#07285a",
            }}
          />
        </Space>
      )}
      {loading && (
        <Space style={{ marginTop: 16 }}>
          <Spin spinning={loading} size="large" />
        </Space>
      )}
    </Content>
  );
};

export default Dictionary;
