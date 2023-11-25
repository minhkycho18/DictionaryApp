import { Col, Input, Row, Select, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./VocabularyManagement.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult } from "../../../stores/search-word/searchThunk";
import { upperFirst } from "lodash/string";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { getAllPos } from "../../../api/Vocabulary/vocabulary.api";
import VocabularyDataTable from "../../../components/data-table/VocabularyDataTable";
import VocabularyDetailModal from "../../../components/Modal/VocabularyDetailModal";

const VocabularyManagement = () => {
  const { result, loading, currentPage, totalElements } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();
  const [pagination, setPaginations] = useState({});
  const [keyword, setKeywords] = useState("");
  const [pos, setPos] = useState([]);
  const [currentPos, setCurrentPos] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState({});

  const onChangeSearch = (event) => {
    const newValue = event.target.value;
    setKeywords(newValue);
    debounceInputKey({
      keyword: newValue,
      currentPos,
    });
  };

  const onChangePosFilter = (value) => {
    setCurrentPos(value);
    dispatch(
      getSearchResult({ keyword: keyword, offset: currentPage, pos: value })
    );
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      dispatch(
        getSearchResult({
          keyword: nextValue.keyword,
          offset: currentPage,
          pos: nextValue.currentPos,
        })
      );
    }, 500)
  ).current;

  const handleTableChange = (currentPage) => {
    dispatch(
      getSearchResult({
        keyword: keyword,
        offset: currentPage,
        pos: currentPos,
      })
    );
  };

  const handleClickItem = (record) => {
    handleShow();
    setSelectedVocab(record);
  };

  const handleShow = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getSearchResult({ keyword: keyword, offset: 0, pos: currentPos }));
    const getPos = async () => {
      const result = await getAllPos();
      setPos(result);
    };
    getPos();
  }, []);

  useEffect(() => {
    setPaginations({
      current: currentPage,
      total: totalElements,
      showSizeChanger: false,
      position: ["bottomCenter", "right"],
      simple: true,
      responsive: true,
    });
  }, [currentPage, totalElements]);

  return (
    <Space
      className={"content-container_box"}
      direction={"vertical"}
      size={"large"}
    >
      <Row className={"box_title"}>
        <Col className={"title"} span={24}>
          Vocabulary Management
        </Col>
      </Row>
      <div className={"box_data"}>
        <Row className={"box_data_item search_box"}>
          <Col offset={1} span={8}>
            <Space direction={"vertical"}>
              <span className="pos_filter-title">Part of speech</span>
              <Select
                bordered
                placeholder="Part of speech"
                style={{ width: 200 }}
                className="pos_filter-select"
                options={pos.map((item) => ({
                  value: upperFirst(item),
                  label: upperFirst(item),
                }))}
                onChange={onChangePosFilter}
              />
            </Space>
          </Col>

          <Col
            offset={7}
            span={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Input
              className="search_vocab"
              placeholder="Search 'vocab'"
              prefix={
                <SearchOutlined style={{ color: "#bbb", padding: "0px 4px" }} />
              }
              onChange={onChangeSearch}
            ></Input>
          </Col>
        </Row>
        <Row justify={"center"} className={"box_data_item table_box"}>
          <Col span={22}>
            <VocabularyDataTable
              loading={loading}
              currentPage={currentPage}
              pagination={pagination}
              dataSource={result.map((item) => ({
                ...item,
                key: item.id,
              }))}
              editable={true}
              onTableChange={handleTableChange}
              onClickItem={handleClickItem}
            />
          </Col>
        </Row>
      </div>
      {isModalOpen && (
        <VocabularyDetailModal
          vocabDetail={selectedVocab}
          isOpen={isModalOpen}
          handleShow={handleShow}
        />
      )}
    </Space>
  );
};

export default VocabularyManagement;
