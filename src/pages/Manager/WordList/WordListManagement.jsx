import React, { useEffect, useState } from "react";
import "./WordListManagement.scss";
import { Button, Col, Input, Row, Select, Space, message } from "antd";
import {
  FilterOutlined,
  LeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import WordListDataTable from "../../../components/data-table/WordList/WordListDataTable";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewWL,
  deleteExistWordList,
  getAllWL,
  updateWl,
} from "../../../stores/word-lists/wordLists-thunk";
import {
  createSubcategory,
  deleteSubcategory,
  getAllVocabInSubcategory,
  getSubcategory,
  updateSubcategory,
} from "../../../stores/subcategory/subcategoryThunk";
import SubcategoryDataTable from "../../../components/data-table/WordList/SubcategoryDataTable";
import VocabularyDataTable from "../../../components/data-table/VocabularyDataTable";
import { selectWl } from "../../../stores/subcategory/subcategorySlice";
import AddModal from "./CustomModals/AddModal";
import AddNewVocabularyModal from "./CustomModals/AddNewVocabularyModal";

const WordListManagement = () => {
  const WORDLIST_DATA_TYPE = "wordlist";
  const SUBCATEGORY_DATA_TYPE = "subcategory";
  const VOCABULARY_DATA_TYPE = "vocabulary";
  const [pagination, setPaginations] = useState({});
  const [currentDataType, setCurrentDataType] = useState(WORDLIST_DATA_TYPE);
  const { wordLists, loading } = useSelector((state) => state.wordLists);
  const {
    subcategories,
    vocabInSub,
    selectedWL,
    VocabLoading,
    loading: subLoading,
  } = useSelector((state) => state.subcategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWL());
  }, []);

  const onCLickItem = (record) => {
    if (currentDataType === WORDLIST_DATA_TYPE) {
      dispatch(getSubcategory(record.id));
      dispatch(selectWl(record));
      setCurrentDataType(SUBCATEGORY_DATA_TYPE);
    } else if (currentDataType === SUBCATEGORY_DATA_TYPE) {
      const params = {
        wordListId: selectedWL.id,
        SubId: record.subcategoryId,
        offset: 0,
        limit: 10,
      };
      dispatch(getAllVocabInSubcategory(params));
      setCurrentDataType(VOCABULARY_DATA_TYPE);
    }
  };

  const handleCreateNew = (param) => {
    currentDataType === WORDLIST_DATA_TYPE
      ? dispatch(createNewWL(param))
      : dispatch(createSubcategory({ ...param, wordListId: selectedWL.id }));
    message.success("Create successfully!");
  };

  const handleEdit = (param) => {
    currentDataType === WORDLIST_DATA_TYPE
      ? dispatch(updateWl(param))
      : dispatch(
          updateSubcategory({
            ...param,
            wordListId: selectedWL.id,
          })
        );
    message.success("Edit successfully!");
  };

  const handleDelete = (param) => {
    currentDataType === WORDLIST_DATA_TYPE
      ? dispatch(deleteExistWordList(param))
      : dispatch(deleteSubcategory({ ...param, wordListId: selectedWL.id }));
    message.success("Delete successfully!");
  };

  const handleTableChange = () => {
    // dispatch(getAllWL());
  };

  const onBack = () => {
    if (currentDataType === VOCABULARY_DATA_TYPE) {
      setCurrentDataType(SUBCATEGORY_DATA_TYPE);
    } else if (currentDataType === SUBCATEGORY_DATA_TYPE) {
      setCurrentDataType(WORDLIST_DATA_TYPE);
    }
  };

  return (
    <Space
      className={"content-container_box"}
      direction={"vertical"}
      size={"large"}
    >
      <Row className={"box_title"}>
        <Col className={"title"} span={24}>
          System WordList Management
        </Col>
      </Row>
      <div className="box_data" style={{ gap: "20px" }}>
        <Row className={"box_data_item search_box"}>
          <Col offset={1} span={8}>
            <Space direction={"vertical"}>
              <span className="pos_filter-title">
                Filter by <FilterOutlined />
              </span>
              <Select
                bordered
                placeholder="-- All --"
                style={{ width: 200 }}
                className="pos_filter-select"
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
              placeholder="Search 'WordList'"
              prefix={
                <SearchOutlined style={{ color: "#bbb", padding: "0px 4px" }} />
              }
            ></Input>
          </Col>
        </Row>
        <Row className={"box_data_item add_box"}>
          <Col offset={1} span={8}>
            {currentDataType === VOCABULARY_DATA_TYPE ? (
              <AddNewVocabularyModal />
            ) : (
              <AddModal
                type={currentDataType}
                handleCreateNew={handleCreateNew}
                selectedWordList={selectWl}
              />
            )}
          </Col>
        </Row>
        {currentDataType !== WORDLIST_DATA_TYPE && (
          <Row className={"box_data_item"}>
            <Col offset={1} span={8}>
              <Button type="text" onClick={onBack}>
                <LeftOutlined /> Back
              </Button>
            </Col>
          </Row>
        )}
        <Row justify={"center"} className={"box_data_item table_box"}>
          <Col span={22}>
            {currentDataType === WORDLIST_DATA_TYPE && (
              <WordListDataTable
                loading={loading}
                onCLickItem={onCLickItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleTableChange={handleTableChange}
                dataSource={wordLists.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
              />
            )}

            {currentDataType === SUBCATEGORY_DATA_TYPE && (
              <SubcategoryDataTable
                loading={subLoading}
                onCLickItem={onCLickItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                dataSource={subcategories.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
              />
            )}

            {currentDataType === VOCABULARY_DATA_TYPE && (
              <VocabularyDataTable
                loading={VocabLoading}
                isEditable={false}
                onCLickItem={onCLickItem}
                dataSource={vocabInSub.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
              />
            )}
          </Col>
        </Row>
      </div>
    </Space>
  );
};

export default WordListManagement;
