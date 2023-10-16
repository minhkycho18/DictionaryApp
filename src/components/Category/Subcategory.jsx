import { PlusOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import SubItem from "./SubItem/SubItem";
import "./Subcategory.scss";
const Subcategory = () => {
  const navigate = useNavigate();

  return (
    <Space className="subcategory">
      <Row>
        <Col span={4}>
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
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
        <Col span={4}>
          <SubItem />
        </Col>
      </Row>
    </Space>
  );
};

export default Subcategory;
