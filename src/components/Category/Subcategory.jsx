import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  Empty,
  Input,
  Menu,
  Modal,
  Pagination,
  Select,
  Space,
  Spin,
  Tooltip,
  message,
} from "antd";
import { debounce, upperFirst } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCustomVocabInSub,
  addWordToSub,
  deleteVocabsInSub,
  getAllVocabInSub,
} from "../../api/Subcategory/subcategory.api";
import CustomWord from "./CustomWord/CustomWord";
import DefaultWord from "./DefaultWord/DefaultWord";
import SubcategoryItem from "./SubItem/SubcategoryItem";
import "./Subcategory.scss";
import { getAllPos } from "../../api/Vocabulary/vocabulary.api";

const Subcategory = (props) => {
  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const { VocabLoading } = useSelector((state) => state.subcategory);
  const [modal, contextHolder] = Modal.useModal();
  const [inputWord, setInputWord] = useState("");
  const [keyword, setKeyword] = useState("");
  const [vocabsInSub, setVocabsInSub] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [allPos, setAllPos] = useState([]);
  const [, ctxHolder] = message.useMessage();
  //  setCurrentPos(value);
  const [currentPos, setCurrentPos] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    const params = {
      wordListId: id,
      SubId: props.subcategory.subcategoryId,
      limit: props?.subcategory?.amountOfWord,
      offset: 0,
    };
    const getAllVocab = async () => {
      try {
        const result = await getAllVocabInSub(params);
        setVocabsInSub(result.content);
      } catch (error) {
        console.log(error);
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
    getAllVocab();
    _getAllPos();
  }, [id, props.subcategory.amountOfWord, props.subcategory.subcategoryId]);

  const plainOptions = vocabsInSub;
  const checkAll =
    plainOptions.length === selectedIds.length && plainOptions.length !== 0;
  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < plainOptions.length;

  //==============================================================================================================

  //==============================================================================================================
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      setKeyword(nextValue);
      setPage(1);
    }, 500)
  ).current;

  //==============================================================================================================
  const onConfirmDelete = () => {
    props?.onDel([props.subcategory.subcategoryId]);
  };
  const onChangePosFilter = (value) => {
    setCurrentPos(value);
  };
  //==============================================================================================================
  const onCheckAllChange = (e) => {
    const checkAllItem = vocabsInSub.map((vocab) => ({
      vocabId: vocab.vocabId,
      defId: vocab.definition.defId,
    }));
    setSelectedIds(e.target.checked ? checkAllItem : []);
  };

  const onChangeList = (items) => {
    if (
      selectedIds.some(
        (item) => item.vocabId === items.vocabId && item.defId === items.defId
      )
    ) {
      setSelectedIds(
        selectedIds.filter(
          (selectedItem) =>
            selectedItem.vocabId !== items.vocabId &&
            selectedItem.defId !== items.defId
        )
      );
    } else {
      setSelectedIds([...selectedIds, items]);
    }
  };

  //==============================================================================================================
  const filterVocab = vocabsInSub.filter((vocab) =>
    vocab.word.toLowerCase().startsWith(keyword.toLowerCase())
  );
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filterByPos =
    currentPos === "All"
      ? filterVocab
      : filterVocab.filter((vocab) =>
          vocab.pos.toLowerCase().startsWith(currentPos.toLowerCase())
        );
  const wordsToDisplay = filterByPos.slice(startIndex, endIndex);
  // const filterVocabByPos = wordsToDisplay.filter((vocab) =>
  //   vocab.pos.toLowerCase().startsWith(currentPos.toLowerCase())
  // );

  const renderVocabInSub = wordsToDisplay.map((vocab, index) => (
    <SubcategoryItem
      key={index}
      vocab={vocab}
      setList={onChangeList}
      isChecked={selectedIds.some(
        (item) =>
          item.vocabId === vocab.vocabId &&
          item.defId === vocab.definition.defId
      )}
    />
  ));
  const renderEmpty = (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: "120px",
      }}
      className=""
      description={
        <span className="empty__sub--content">
          You don't have any vocab yet. Click the button above to add one.
        </span>
      }
    >
      <Button className="empty__sub--add" onClick={() => setIsOpen(!isOpen)}>
        Add Now
      </Button>
    </Empty>
  );
  //==============================================================================================================
  const handleAddAndRemoveVocab = (value) => {
    if (value.isAdded) {
      handleDeleteVocabInSub([
        {
          vocabId: value.word.id,
          defId: value.definition.defId,
        },
      ]);
    } else {
      const params = {
        wordListId: id,
        SubId: props.subcategory.subcategoryId,
        vocabId: value.word.id,
        defId: value.definition.defId,
      };
      const addVocab = async () => {
        const result = await addWordToSub(params);
        setVocabsInSub([...vocabsInSub, result]);
      };
      addVocab();
    }
  };
  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };
  //==============================================================================================================
  const handleAddCustomVocab = (value) => {
    const addVocab = async () => {
      try {
        const result = await addCustomVocabInSub(value);
        const generateResult = result.definitions.map((definition) => ({
          ...result,
          definition: definition,
        }));
        const newWords = generateResult.map(({ definitions, ...rest }) => rest);
        setVocabsInSub([...vocabsInSub, ...newWords]);
        message.success("Successful!");
      } catch (error) {
        message.error("Cannot add this word to subcategory!");
      }
    };
    addVocab();
  };
  //==============================================================================================================

  const handleDeleteVocabInSub = (values) => {
    const params = {
      wordListId: id,
      SubId: props.subcategory.subcategoryId,
      data: [...values],
    };
    const removeVocab = async () => {
      // eslint-disable-next-line no-unused-vars
      const result = await deleteVocabsInSub(params);
      const newVocab = vocabsInSub.filter((vocab) => {
        return !params.data.some(
          (delVocab) =>
            delVocab.vocabId === vocab.vocabId &&
            delVocab.defId === vocab.definition.defId
        );
      });
      setSelectedIds([]);
      setVocabsInSub([...newVocab]);
    };
    removeVocab();
  };
  return (
    <Space className="subcategory" direction="vertical">
      {ctxHolder}
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Space style={{ float: "right" }} className="subcategory__options">
          <Dropdown
            placement="topLeft"
            overlay={
              <Menu
                items={[
                  {
                    key: "1",
                    label: "Delete subcategory",
                    icon: <DeleteOutlined />,
                    style: {
                      color: "red",
                    },
                    onClick: () => {
                      modal.confirm({
                        title: "Confirm",
                        icon: <ExclamationCircleOutlined />,
                        content: "Do you want to delete this subcategory ?",
                        okText: "Delete",
                        cancelText: "Cancel",
                        okButtonProps: { danger: true },
                        onOk: onConfirmDelete,
                      });
                    },
                  },
                ]}
              />
            }
            trigger={["click"]}
          >
            <Button icon={<MoreOutlined />} />
          </Dropdown>
          <Input
            className="search__sub search__vocab"
            placeholder="Search"
            prefix={
              <SearchOutlined style={{ color: "#bbb", padding: "0px 4px" }} />
            }
            value={inputWord}
            onChange={onChangeInput}
          ></Input>
        </Space>
        <Button
          className="subcategory__study"
          onClick={() =>
            navigate(
              `/vocabulary/${id}/detail/${props.subcategory.subcategoryId}/learn`
            )
          }
        >
          <span style={{ marginRight: 8 }}>Study</span>
          <FaGraduationCap size={22} />
        </Button>
      </Space>

      <div className="subcategory__back" direction="vertical">
        {contextHolder}
        <Modal
          centered
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
        >
          <Space style={{ width: "100%" }} direction="vertical">
            <Space
              style={{
                width: "100%",
                textAlign: "center",
              }}
              className="tab"
            >
              <div
                className={`tab__options ${isCustom ? "" : "active"}`}
                onClick={() => setIsCustom(false)}
              >
                Default word
              </div>
              <div
                className={`tab__options ${!isCustom ? "" : "active"}`}
                onClick={() => setIsCustom(true)}
              >
                Custom word
              </div>
            </Space>
            {!isCustom && (
              <DefaultWord
                vocabInSub={vocabsInSub}
                onAddVocab={handleAddAndRemoveVocab}
              />
            )}
            {isCustom && (
              <CustomWord
                type={props?.subcategory?.subcategoryType}
                vocabInSub={vocabsInSub}
                handleAddCustomVocab={handleAddCustomVocab}
                subInfo={{
                  wordListId: id,
                  SubId: props.subcategory.subcategoryId,
                }}
              />
            )}
          </Space>
        </Modal>

        {!VocabLoading && vocabsInSub.length > 0 && (
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
                    indeterminate={indeterminate}
                    onClick={onCheckAllChange}
                    checked={checkAll}
                  ></Checkbox>
                  <Tooltip title="Delete selected items" color={"danger"}>
                    <DeleteOutlined
                      className="delete-btn__icon"
                      style={{
                        color: `${selectedIds.length > 0 ? "red" : "black"}`,
                      }}
                      onClick={() => handleDeleteVocabInSub(selectedIds)}
                    />
                  </Tooltip>
                </Space>
                <Select
                  bordered
                  placeholder="Part of speech"
                  style={{ width: 200 }}
                  className="pos_filter-select"
                  options={allPos.map((item) => ({
                    value: upperFirst(item),
                    label: upperFirst(item),
                  }))}
                  defaultValue={"All"}
                  onChange={onChangePosFilter}
                />
              </Space>
              <Pagination
                defaultCurrent={1}
                total={filterByPos.length}
                onChange={onChange}
                size="small"
                current={page}
              />
            </Space>
            <Space
              className="subcategory-item subcategory_add"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <PlusOutlined className="subcategory_add__icon" />
              <span>Add more...</span>
            </Space>
            {renderVocabInSub}
          </Space>
        )}
        {!VocabLoading && !vocabsInSub.length && renderEmpty}
        {VocabLoading && <Spin spinning={VocabLoading} />}
      </div>
    </Space>
  );
};

export default Subcategory;
