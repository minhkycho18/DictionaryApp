import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  Pagination,
  Select,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { debounce, upperFirst } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { getLeitnerVocabs } from "../../../api/Leitner/leitner.api";
import { getAllPos } from "../../../api/Vocabulary/vocabulary.api";
import colorPos from "../../../helpers/ColorPos";
import "./LeitnerGame.scss";
import { useDispatch } from "react-redux";
import { setCurrentLeitnerLevel } from "../../../stores/leitner/leitnerSlice";
const LeitnerLevel = (props) => {
  const loader = useLoaderData();
  const [vocabs, setVocabs] = useState();
  const [allPos, setAllPos] = useState([]);
  const [keyword, setKeywords] = useState("");
  const [currentPos, setCurrentPos] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentLeitnerLevel(+loader.data.level));
    const _getAllVocab = async () => {
      const result = await getLeitnerVocabs({
        level: +loader.data.level,
        offset: offset,
      });
      if (result) {
        setVocabs(result);
      }
    };
    const _getAllPos = async () => {
      try {
        const result = await getAllPos();
        setAllPos(["All", ...result]);
      } catch (error) {
        console.log(error);
      }
    };
    _getAllPos();
    _getAllVocab();
  }, [dispatch, loader.data.level, offset]);
  const onChangePosFilter = async (value) => {
    setCurrentPos(value);
    try {
      const result = await getLeitnerVocabs({
        level: +loader.data.level,
        pos: value === "All" ? null : value,
        offset: offset,
      });
      if (result) {
        setVocabs(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onPageChange = (value) => {
    setCurrentPage(value);
    setOffset((value - 1) * 10);
  };
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setKeywords(newValue);
    debounceInputKey({ keyword: newValue, pos: currentPos });
  };

  const debounceInputKey = useRef(
    debounce(async (nextValue) => {
      try {
        const result = await getLeitnerVocabs({
          level: +loader.data.level,
          pos: nextValue.pos === "All" ? null : nextValue.pos,
          offset: offset,
          keyword: nextValue.keyword,
        });
        if (result) {
          setVocabs(result);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500)
  ).current;
  // const onPageChange = (value) => {
  //   setCurrentPage(value);
  //   setOffset((value - 1) * 10);
  // };
  const renderVocabInSub =
    vocabs &&
    vocabs?.content.map((vocab, index) => (
      <Space className="subcategory-item" key={index}>
        <Space>
          <Checkbox
            // onChange={onCheckbox}
            // checked={isChecked}
            className="checkbox__del"
          ></Checkbox>
          <Space className="subcategory__header" direction="vertical">
            <Space className="vocabulary">
              <Space className="vocabulary__title">{vocab?.word}</Space>
              <Space className="vocabulary__phonetic">
                {vocab?.phoneUs || vocab?.phoneUk}
              </Space>
            </Space>
            <Space className="subcategory__content">
              {vocab?.definition?.wordDesc}
            </Space>
          </Space>
        </Space>
        <Tag color={colorPos.get(vocab?.pos)} style={{ fontSize: "15px" }}>
          {upperFirst(vocab?.pos)}
        </Tag>
        {/* <span className="vocabulary__pos">[{vocab?.pos}]</span> */}
      </Space>
    ));
  return (
    <Space className="subcategory" direction="vertical">
      <div className="subcategory__back" direction="vertical">
        {/* {contextHolder} */}

        <Space direction="vertical">
          <Space
            style={{
              marginTop: 8,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space>
              <Space className="delete-btn">
                <Checkbox
                  style={{
                    marginLeft: 12,
                  }}
                  // indeterminate={indeterminate}
                  // onClick={onCheckAllChange}
                  // checked={checkAll}
                ></Checkbox>
                <Tooltip title="Delete selected items" color={"danger"}>
                  <DeleteOutlined
                    className="delete-btn__icon"
                    // style={{
                    //   color: `${selectedIds.length > 0 ? "red" : "black"}`,
                    // }}
                  />
                </Tooltip>
              </Space>
              <Select
                bordered
                placeholder="Part of speech"
                style={{ width: 200 }}
                className="pos_filter-select"
                options={allPos.map((item) => ({
                  value: item,
                  label: upperFirst(item),
                }))}
                defaultValue={"All"}
                value={currentPos}
                onChange={onChangePosFilter}
              />
            </Space>
            <Space>
              <Input
                className="search__sub search__vocab"
                placeholder="Search"
                prefix={
                  <SearchOutlined
                    style={{ color: "#bbb", padding: "0px 4px" }}
                  />
                }
                value={keyword}
                onChange={onChangeInput}
              ></Input>
              <Pagination
                defaultCurrent={1}
                total={vocabs?.totalElements}
                onChange={onPageChange}
                size="small"
                current={currentPage}
              />
            </Space>
          </Space>

          {vocabs && renderVocabInSub}
        </Space>
        {/* {!VocabLoading && !vocabsInSub.length && renderEmpty} */}
        {/* {VocabLoading && <Spin spinning={VocabLoading} />} */}
      </div>
    </Space>
  );
};

export default LeitnerLevel;
