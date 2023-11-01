import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  Modal,
  Space,
  Spin,
} from "antd";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addWordToSubcategory,
  getAllVocabInSubcategory,
} from "../../stores/subcategory/subcategoryThunk";
import CustomWord from "./CustomWord/CustomWord";
import DefaultWord from "./DefaultWord/DefaultWord";
import SubcategoryItem from "./SubItem/SubcategoryItem";
import "./Subcategory.scss";

const Subcategory = (props) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const { vocabInSub, VocabLoading } = useSelector(
    (state) => state.subcategory
  );
  const [modal, contextHolder] = Modal.useModal();
  const [inputWord, setInputWord] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [numItem, setNumItem] = useState(10);
  const plainOptions = vocabInSub;
  const checkAll = plainOptions.length === selectedIds.length;
  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < plainOptions.length;
  useEffect(() => {
    const params = {
      wordListId: id,
      SubId: props.subcategory.subcategoryId,
    };
    dispatch(getAllVocabInSubcategory(params));
    setNumItem(10);
  }, [dispatch, id, props.subcategory.subcategoryId]);

  //==============================================================================================================
  const handleSetCustom = () => {
    setIsCustom(!isCustom);
  };

  //==============================================================================================================
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      setKeyword(nextValue);
    }, 500)
  ).current;

  //==============================================================================================================
  const onConfirmDelete = () => {
    props?.onDel([props.subcategory.subcategoryId]);
  };

  //==============================================================================================================
  const onCheckAllChange = (e) => {
    const checkAllItem = vocabInSub.map((vocab) => ({
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
  const filterVocab = vocabInSub.filter((vocab) =>
    vocab.word.startsWith(keyword)
  );
  const limitVocab = filterVocab.splice(0, numItem);
  const renderVocabInSub = limitVocab.map((vocab, index) => (
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
  //==============================================================================================================
  const handleAddVocab = (value) => {
    const params = {
      wordListId: id,
      SubId: props.subcategory.subcategoryId,
      ...value,
    };
    dispatch(addWordToSubcategory(params));
  };

  return (
    <Space className="subcategory" direction="vertical">
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Button className="subcategory__study">
          <span style={{ marginRight: 8 }}>Study</span>
          <FaGraduationCap size={22} />
        </Button>
        <Space style={{ float: "right" }} className="subcategory__options">
          <Input
            className="search__sub search__vocab"
            placeholder="Search"
            prefix={
              <SearchOutlined style={{ color: "#bbb", padding: "0px 4px" }} />
            }
            value={inputWord}
            onChange={onChangeInput}
          ></Input>
          <Space className="delete-btn">
            <DeleteOutlined />
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            ></Checkbox>
          </Space>

          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu
                items={[
                  {
                    key: "1",
                    label: "Edit",
                    icon: <EditOutlined />,
                  },

                  {
                    key: "2",
                    label: "Delete",
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
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
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
                onClick={handleSetCustom}
              >
                Default word
              </div>
              <div
                className={`tab__options ${!isCustom ? "" : "active"}`}
                onClick={handleSetCustom}
              >
                Custom word
              </div>
            </Space>

            {!isCustom && (
              <DefaultWord
                vocabInSub={vocabInSub}
                onAddVocab={handleAddVocab}
              />
            )}
            {isCustom && <CustomWord vocabInSub={vocabInSub} />}
          </Space>
        </Modal>

        {!VocabLoading && (
          <>
            <Space
              className="subcategory-item subcategory_add"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <PlusOutlined className="subcategory_add__icon" />
              <span>Add more...</span>
            </Space>
            {renderVocabInSub}
            {vocabInSub.length > 10 && (
              <Button
                className="showMore"
                onClick={() => setNumItem((prevNum) => prevNum + 10)}
              >
                More...
              </Button>
            )}
          </>
        )}

        {VocabLoading && <Spin spinning={VocabLoading} />}
      </div>
    </Space>
  );
};

export default Subcategory;
