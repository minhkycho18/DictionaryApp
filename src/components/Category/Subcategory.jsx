import {
  DeleteOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Menu, Modal, Space, Spin } from "antd";
import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllVocabInSubcategory } from "../../stores/subcategory/subcategoryThunk";
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
  useEffect(() => {
    const params = {
      wordListId: id,
      SubId: props.subcategory.subcategoryId,
    };
    dispatch(getAllVocabInSubcategory(params));
  }, [dispatch, id, props.subcategory.subcategoryId]);

  const handleSetCustom = () => {
    setIsCustom(!isCustom);
  };
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      setKeyword(nextValue);
      console.log(nextValue);
    }, 500)
  ).current;
  const onConfirmDelete = () => {
    props?.onDel([props.subcategory.subcategoryId]);
  };
  const filterVocab =
    keyword !== ""
      ? vocabInSub.filter((vocab) => vocab.word === keyword)
      : vocabInSub;
  const renderVocabInSub = filterVocab.map((vocab, index) => (
    <SubcategoryItem key={index} vocab={vocab} />
  ));

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

          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu
                items={[
                  {
                    key: "1",
                    label: "Report",
                    icon: <WarningOutlined />,
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
      <Space className="subcategory__back" direction="vertical">
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

            {!isCustom && <DefaultWord />}
            {isCustom && <CustomWord />}
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
          </>
        )}

        {VocabLoading && <Spin spinning={VocabLoading} />}
      </Space>
    </Space>
  );
};

export default Subcategory;
