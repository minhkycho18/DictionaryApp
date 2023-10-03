import { SoundFilled } from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import React from "react";
import en from "../../assets/images/en-circle.png";
import "./Phonetic.scss";
import Meaning from "./Meaning";
import { useSelector } from "react-redux";
import Examples from "./Examples";
const Phonetic = (props) => {
  const { word } = useSelector((state) => state.search);

  return (
    <div>
      <Row gutter={[32, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <Space className="wrappered border border--blue">
            <Space direction="vertical" wrap>
              <Space className="phonetic">
                <span className="phonetic__word">{word}</span>
                <span>
                  <SoundFilled className="phonetic__icon" />
                </span>
              </Space>
              <Space
                style={{
                  paddingTop: "16px",
                  alignItems: "start",
                  display: "flex",
                }}
              >
                <Avatar src={en} className="language__flag"></Avatar>
                <span className="phonetic__content">
                  {props?.phonetic} /lˈɒŋɡən/
                </span>
              </Space>
            </Space>
            <span className="phonetic__type">[{props?.type}noun]</span>
          </Space>
          <Meaning />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Examples />
        </Col>
      </Row>
    </div>
  );
};

export default Phonetic;
