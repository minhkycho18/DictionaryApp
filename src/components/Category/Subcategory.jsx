import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteSubcategory,
  getAllVocabInSubcategory,
} from "../../stores/subcategory/subcategoryThunk";
import CustomWord from "./CustomWord/CustomWord";
import DefaultWord from "./DefaultWord/DefaultWord";
import SubItem from "./SubItem/SubItem";
import "./Subcategory.scss";

const Subcategory = (props) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [isSearching, setIsSearching] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const { vocabInSub, VocabLoading, error } = useSelector(
    (state) => state.subcategory
  );

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

  const handleSearchAWord = () => {
    setIsSearching(!isSearching);
  };
  const onConfirmDelete = () => {
    dispatch(
      deleteSubcategory({
        wordListId: id,
        SubId: props.subcategory.subcategoryId,
      })
    );
    messageApi.success("success!");
  };

  const onCancel = () => {};
  return (
    <Space className="subcategory" direction="vertical">
      {contextHolder}
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Button className="subcategory__study">
          <span style={{ marginRight: 8 }}>Study</span>
          <FaGraduationCap size={22} />
        </Button>
        <Space.Compact
          style={{ float: "right" }}
          className="subcategory__options"
        >
          {isSearching && <Input className="subcategory__options__input" />}
          <Button
            onClick={handleSearchAWord}
            className="subcategory__options__btn--search"
          >
            <SearchOutlined />
          </Button>
          <Popconfirm
            title="Delete the subcategory"
            description="Are you sure to delete this subcategory?"
            onConfirm={onConfirmDelete}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
            placement="bottomRight"
            okButtonProps={{
              style: {
                backgroundColor: "#dc3545",
              },
            }}
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space.Compact>
      </Space>
      <Space
        style={{
          width: "100%",
          backgroundColor: "#e0e7f2",
          padding: 16,
          borderRadius: 16,
          marginTop: 16,
        }}
      >
        <Modal
          // title="Vertically centered modal dialog"
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
          <Row
            justify="start"
            gutter={[16, 16]}
            className={`${VocabLoading ? "vocabLoading-css" : ""}`}
          >
            <Col span={4} className="gutter-row">
              <Space
                className="subitem subitem__add"
                direction="vertical"
                style={{ cursor: "pointer" }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Space className="subitem__content " direction="vertical" wrap>
                  <PlusOutlined />
                </Space>
              </Space>
            </Col>
            {vocabInSub.map((vocab, index) => (
              <Col span={4} className="gutter-row" key={index}>
                <SubItem vocab={vocab} />
              </Col>
            ))}
          </Row>
        )}

        {VocabLoading && <Spin spinning={VocabLoading} />}
      </Space>
    </Space>
  );
};

export default Subcategory;
