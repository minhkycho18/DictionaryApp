import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Space, message } from "antd";
import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSubcategory } from "../../stores/subcategory/subcategoryThunk";
import SubItem from "./SubItem/SubItem";
import "./Subcategory.scss";

const Subcategory = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const [isSearching, setIsSearching] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSearchAWord = () => {
    console.log("search");
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
          wrap
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
            title="Delete the task"
            description="Are you sure to delete this task?"
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
      {/* // background-color: #e0e7f2; */}
      <Space
        style={{
          width: "100%",
          backgroundColor: "#e0e7f2",
          padding: 16,
          borderRadius: 16,
          marginTop: 16,
        }}
      >
        <Row justify="start" gutter={[16, 16]}>
          <Col span={4} className="gutter-row">
            <Space
              className="subitem subitem__add"
              direction="vertical"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dictionary")}
            >
              <Space className="subitem__content " direction="vertical" wrap>
                <PlusOutlined />
              </Space>
            </Space>
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
          <Col span={4} className="gutter-row">
            <SubItem />
          </Col>
        </Row>
      </Space>
    </Space>
  );
};

export default Subcategory;
