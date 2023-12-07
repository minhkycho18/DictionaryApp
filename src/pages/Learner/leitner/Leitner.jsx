import {
  CalendarOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ContainerOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getLeiner } from "../../../api/Leitner/leitner.api";
// import LeitnerItem from "../../../components/leitner-item/LeitnerItem";
import "./Leitner.scss";
import LeitnerItem from "../../../components/leitner/leitner-item/LeitnerItem";

const Leitner = () => {
  const [leitner, setLeitner] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const MOBILE_WIDTH = 768;
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const _getLeitner = async () => {
      try {
        const rs = await getLeiner();
        if (rs) {
          const reorderedLeitner = [
            rs[0],
            rs[4],
            rs[1],
            rs[5],
            rs[2],
            rs[6],
            rs[3],
            rs[7],
          ];
          if (windowWidth < MOBILE_WIDTH) {
            setLeitner(rs);
          } else setLeitner(reorderedLeitner);
        }
      } catch (error) {}
    };
    _getLeitner();
    return () => {};
  }, [windowWidth]);
  const renderLevel = leitner.map((level, index) => (
    <Col xs={24} xl={12} className="level_row" key={index}>
      <Space className="level">
        <Space className={` ${"level__num--" + level.level} level__num `}>
          {level?.level === "0" && (
            <HistoryOutlined style={{ fontSize: "20px" }} />
          )}
          {level?.level === "7" && (
            <CheckOutlined style={{ fontSize: "14px" }} />
          )}
          {level?.level !== "0" && level.level !== "7" && level?.level}
        </Space>
        <LeitnerItem levelItem={level} />
      </Space>
    </Col>
  ));
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
        <Row gutter={[16, 32]}>{renderLevel}</Row>
      </Space>
    </Space>
  );
};

export default Leitner;
