import { useEffect, useState } from "react";
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
  updateWl,
  getWordListsDefault,
} from "../../../stores/word-lists/wordLists-thunk";
import {
  createSubcategory,
  getAllVocabInSubcategory,
  getSubcategory,
  updateSubcategory,
} from "../../../stores/subcategory/subcategoryThunk";
import SubcategoryDataTable from "../../../components/data-table/WordList/SubcategoryDataTable";
import VocabularyDataTable from "../../../components/data-table/VocabularyDataTable";
import {
  selectSub,
  selectWl,
} from "../../../stores/subcategory/subcategorySlice";
import AddModal from "./CustomModals/AddModal";
import AddNewVocabularyModal from "./CustomModals/AddNewVocabularyModal";
import {
  getAllVocabInSub,
  deleteVocabsInSub,
  deleteSub,
  addWordToSub,
} from "../../../api/Subcategory/subcategory.api";
import { deleteWordLists } from "../../../api/WordLists/word-lists.api";
import VocabularyDetailModal from "../../../components/Modal/VocabularyDetailModal";

const WordListManagement = () => {
  const WORDLIST_DATA_TYPE = "wordlist";
  const SUBCATEGORY_DATA_TYPE = "subcategory";
  const VOCABULARY_DATA_TYPE = "vocabulary";
  const [pagination, setPaginations] = useState();
  const [currentVocabInSub, setCurrentVocabInSub] = useState([]);
  const [currentDataType, setCurrentDataType] = useState(WORDLIST_DATA_TYPE);
  const [selectedVocabulary, setSelectedVocabulary] = useState({});
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const { wordListsDefault, loading } = useSelector((state) => state.wordLists);
  const {
    subcategories,
    vocabInSub,
    selectedWL,
    selectedSub,
    VocabLoading,
    loading: subLoading,
    currentPage,
    totalElements,
  } = useSelector((state) => state.subcategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWordListsDefault());
    setPaginations({
      ...pagination,
      current: currentPage,
      total: totalElements,
      showSizeChanger: false,
      position: ["bottomCenter", "right"],
      simple: true,
      responsive: true,
    });
  }, [currentPage, totalElements]);

  const refreshDataVocabInSub = async () => {
    const refresh = {
      wordListId: selectedWL.id,
      SubId: pagination.subId,
      offset: 1,
      limit: pagination.total + 1,
    };
    try {
      const response = await getAllVocabInSub(refresh);
      setCurrentVocabInSub(response.content);
    } catch (error) {}
  };

  const onCLickItem = async (record) => {
    if (currentDataType === WORDLIST_DATA_TYPE) {
      const param = {
        wordlistId: record.id,
        keyword: "",
      };
      dispatch(getSubcategory(param));
      dispatch(selectWl(record));
      setCurrentDataType(SUBCATEGORY_DATA_TYPE);
    } else if (currentDataType === SUBCATEGORY_DATA_TYPE) {
      const params = {
        wordListId: selectedWL.id,
        SubId: record.subcategoryId,
        offset: 1,
        limit: record.amountOfWord,
      };
      const response = await getAllVocabInSub(params);
      setCurrentVocabInSub(response.content);
      dispatch(getAllVocabInSubcategory(params));
      dispatch(selectSub(record));
      setPaginations({
        current: 1,
        total: record.amountOfWord,
        showSizeChanger: false,
        position: ["bottomCenter", "right"],
        simple: true,
        responsive: true,
        subId: record.subcategoryId,
      });
      setCurrentDataType(VOCABULARY_DATA_TYPE);
    }
  };

  const handleCreateNew = (param) => {
    currentDataType === WORDLIST_DATA_TYPE
      ? dispatch(createNewWL(param))
      : dispatch(createSubcategory({ ...param, wordListId: selectedWL.id }));
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
  };

  const handleDelete = async (param) => {
    try {
      if (currentDataType === WORDLIST_DATA_TYPE) {
        await deleteWordLists(param);
        dispatch(getWordListsDefault());
      } else {
        const updatedParam = { ...param, wordListId: selectedWL.id };
        await deleteSub(updatedParam);
        dispatch(getSubcategory({ wordlistId: selectedWL.id }));
      }
      message.success("Delete successfully!");
    } catch (error) {
      message.error("Failed to delete");
    }
  };

  const handleAddNewVocab = async (param) => {
    const params = {
      wordListId: selectedWL.id,
      SubId: pagination.subId,
      vocabId: param.word.id,
      defId: param.definition.defId,
    };
    try {
      await addWordToSub(params);
      refreshDataVocabInSub();
      const param = {
        wordListId: selectedWL.id,
        SubId: pagination.subId,
        offset: (pagination.current - 1) * 10,
        limit: 10,
      };
      await dispatch(getAllVocabInSubcategory(param));
      setPaginations({ ...pagination, total: pagination.total + 1 });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("API returned status 400:");
      } else {
        console.log("An error occurred:");
      }
    }
  };

  const handleDeleteVocab = async (items) => {
    console.log(items.currentPage, ">>>>", pagination.current);
    const param = {
      wordListId: selectedWL.id,
      SubId: pagination.subId,
      data: items.data,
    };
    await deleteVocabsInSub(param);
    const params = {
      wordListId: selectedWL.id,
      SubId: pagination.subId,
      offset: items.currentPage,
      limit: 10,
    };

    await dispatch(getAllVocabInSubcategory(params));
    setPaginations({
      ...pagination,
      currentPage: Math.ceil(items.currentPage / 10) - 1,
      total: pagination.total - 1,
    });
    refreshDataVocabInSub();
  };

  const handleSearch = async (value) => {
    if (currentDataType === WORDLIST_DATA_TYPE) {
      dispatch(getWordListsDefault(value));
    } else if (currentDataType === SUBCATEGORY_DATA_TYPE) {
      const param = {
        wordlistId: selectedWL.id,
        keyword: value,
      };
      dispatch(getSubcategory(param));
    }
  };

  const handleTableChange = (param) => {
    dispatch(
      getAllVocabInSubcategory({
        wordListId: selectedWL.id,
        SubId: pagination.subId,
        offset: param,
        limit: 10,
      })
    );
    setPaginations({
      ...pagination,
      current: currentPage,
    });
  };

  const onBack = () => {
    if (currentDataType === VOCABULARY_DATA_TYPE) {
      dispatch(getSubcategory({ wordlistId: selectedWL.id }));
      setCurrentDataType(SUBCATEGORY_DATA_TYPE);
      setCurrentVocabInSub([]);
    } else if (currentDataType === SUBCATEGORY_DATA_TYPE) {
      setCurrentDataType(WORDLIST_DATA_TYPE);
    }
  };

  const handleShow = () => {
    setIsOpenDetailModal(!isOpenDetailModal);
  };

  const onClickVocab = (record) => {
    const { vocabId, definition, ...rest } = record;
    const updatedRecord = {
      id: vocabId,
      ...rest,
      definitions: definition ? [{ ...definition, synonyms: [] }] : [],
    };
    handleShow();
    setSelectedVocabulary(updatedRecord);
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
            {currentDataType !== VOCABULARY_DATA_TYPE && (
              <Input
                className="search_vocab"
                placeholder={`Search ${
                  currentDataType === WORDLIST_DATA_TYPE
                    ? "WordList"
                    : "Subcategory"
                }`}
                prefix={
                  <SearchOutlined
                    style={{ color: "#bbb", padding: "0px 4px" }}
                  />
                }
                onChange={(e) => handleSearch(e.target.value)}
              ></Input>
            )}
          </Col>
        </Row>
        <Row offset={1} className={"box_data_item"}>
          <Col offset={1} span={4}>
            {currentDataType !== WORDLIST_DATA_TYPE && (
              <Button type="text" onClick={onBack}>
                <LeftOutlined /> Back
              </Button>
            )}
          </Col>
          <Col offset={4} span={4} style={{ textAlign: "center" }}>
            {currentDataType === SUBCATEGORY_DATA_TYPE && (
              <h2 style={{ margin: "0" }}>{selectedWL.title}</h2>
            )}
            {currentDataType === VOCABULARY_DATA_TYPE && (
              <h2 style={{ margin: "0" }}>{selectedSub.title}</h2>
            )}
          </Col>
          <Col offset={6} span={4}>
            {currentDataType === VOCABULARY_DATA_TYPE ? (
              <AddNewVocabularyModal
                vocabInSub={currentVocabInSub}
                onAddVocab={handleAddNewVocab}
              />
            ) : (
              <AddModal
                type={currentDataType}
                handleCreateNew={handleCreateNew}
                selectedWordList={selectWl}
              />
            )}
          </Col>
        </Row>

        <Row justify={"center"} className={"box_data_item table_box"}>
          <Col span={22}>
            {currentDataType === WORDLIST_DATA_TYPE && (
              <WordListDataTable
                loading={loading}
                onCLickItem={onCLickItem}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleTableChange={handleTableChange}
                dataSource={wordListsDefault.map((item) => ({
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
                pagination={pagination}
                onClickItem={onClickVocab}
                onTableChange={handleTableChange}
                onDeleteVocabInSub={handleDeleteVocab}
                dataSource={vocabInSub.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
              />
            )}
          </Col>
        </Row>
      </div>
      {isOpenDetailModal && (
        <VocabularyDetailModal
          vocabDetail={selectedVocabulary}
          isOpen={isOpenDetailModal}
          handleShow={handleShow}
        />
      )}
    </Space>
  );
};

export default WordListManagement;
