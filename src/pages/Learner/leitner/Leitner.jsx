import {
  CalendarOutlined,
  CheckCircleOutlined,
  ContainerOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Col, Row, Space, Timeline } from "antd";
import React from "react";
import "./Leitner.scss";
import LeitnerItem from "../../../components/leitner-item/LeitnerItem";

const Leitner = () => {
  return (
    <Space className="wrap-main">
      <Space className="wrap-head leitner">
        <Space className="leitner-start">
          <Space className="leitner-start_btn">START</Space>
        </Space>
        <Space>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space className="leitner-options">
                <CalendarOutlined className="leitner-options_btn" />
                <Space direction="vertical">
                  <Space className="leitner-options_title">Day</Space>
                  <Space className="leitner-options_content">27</Space>
                </Space>
              </Space>
            </Col>
            <Col span={12}>
              <Space className="leitner-options">
                <HistoryOutlined className="leitner-options_btn" />
                <Space direction="vertical">
                  <Space className="leitner-options_title">Waiting</Space>
                  <Space className="leitner-options_content">27</Space>
                </Space>
              </Space>
            </Col>
            <Col span={12}>
              <Space className="leitner-options">
                <ContainerOutlined className="leitner-options_btn" />
                <Space direction="vertical">
                  <Space className="leitner-options_title">Learning</Space>
                  <Space className="leitner-options_content">27</Space>
                </Space>
              </Space>
            </Col>

            <Col span={12}>
              <Space className="leitner-options">
                <CheckCircleOutlined className="leitner-options_btn" />
                <Space direction="vertical">
                  <Space className="leitner-options_title">Learned</Space>
                  <Space className="leitner-options_content">27</Space>
                </Space>
              </Space>
            </Col>
          </Row>
        </Space>
      </Space>
      <Space className="wrap-bottom" direction="vertical">
        <Space className="leitner_title">Leitner Boxes</Space>
        <Space>
          <Timeline
            className="timeline"
            items={[
              {
                children: <LeitnerItem title={"Waiting"} count={20} />,
              },
              {
                children: <LeitnerItem title={"Everyday"} count={20} />,
              },
              {
                children: <LeitnerItem title={"Every 2 day"} count={20} />,
              },
              {
                children: <LeitnerItem title={"Every 4 day"} count={20} />,
              },
            ]}
          />
          <Timeline
            className="timeline"
            items={[
              {
                children: <LeitnerItem title={"Waiting"} count={20} />,
              },
              {
                children: <LeitnerItem title={"Waiting"} count={20} />,
              },
              {
                children: <LeitnerItem title={"Waiting"} count={20} />,
              },
              {
                children: <LeitnerItem title={"Waiting"} count={20} />,
              },
            ]}
          />
        </Space>
      </Space>
    </Space>
  );
};

export default Leitner;
