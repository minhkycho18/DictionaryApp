import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Popconfirm, Row, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import SubItem from "./SubItem/SubItem";
import "./Subcategory.scss";
const Subcategory = () => {
  const navigate = useNavigate();
  const handleSearchAWord = () => {
    console.log("search");
  };
  const onConfirm = () => {};
  const onCancel = () => {};
  return (
    <Space className="subcategory" direction="vertical">
      <Space style={{ float: "right" }}>
        <Space.Compact wrap>
          <Input style={{ border: "1px solid #0b043d" }}></Input>
          <Button
            style={{ border: "1px solid #0b043d" }}
            onClick={handleSearchAWord}
          >
            <SearchOutlined />
          </Button>
        </Space.Compact>
        <Space.Compact wrap>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
            placement="bottomRight"
          >
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space.Compact>
      </Space>
      <Row justify="start" style={{ width: "100%" }}>
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
  );
};

export default Subcategory;
