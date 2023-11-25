import { Button, Card, Col, Image, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import AiImage from "../../../assets/images/ai-based-real-world-examples-500.png";
import backGround from "../../../assets/images/background.png";
import funImage from "../../../assets/images/fun-learning-tools-500.png";
import dynamic from "../../../assets/images/learn-with-a-dynamic-platform-500.png";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Content className="main">
      <Space className="content">
        <Space className="introduce" direction="vertical">
          <Space className="introduce__title">Learn with MyTeam</Space>
          <Space className="introduce__paragraph">
            DictionaryApp is a language learning platform that helps you learn
            easier, faster and smarter.
          </Space>
          <Space className="introduce__btn" wrap>
            <Button
              type="primary"
              className="btn btn__pri"
              onClick={() => navigate("./dictionary")}
            >
              Dictionary
            </Button>
            <Button
              className="btn btn__sec"
              onClick={() => navigate("./vocabulary")}
            >
              Word Lists
            </Button>
          </Space>
        </Space>
        <Image className="image" src={backGround} preview={false}></Image>
      </Space>
      <Space className="bg-second content " direction="vertical">
        <Space direction="vertical" className="feature">
          <p className="introduce__title feature__title">Main Features</p>
          <p className="introduce__paragraph feature__paragraph">
            Here are some of the features available at Langeek to help you
            achieve your language learning goals.
          </p>
        </Space>
        <Space direction="horizontal" className="banner">
          <Row gutter={32}>
            <Col>
              <Card className="banner__item">
                <Image src={dynamic} preview={false}></Image>
                <p className="banner__title">Learn with a Dynamic Platform</p>
                <p className="banner__paragraph">
                  DictionaryApp is smart, curious, and alive. It monitors your
                  learning progress and will change your learning path
                  accordingly. For every learner, LanGeek offers a unique
                  platform.
                </p>
              </Card>
            </Col>
            <Col>
              <Card className="banner__item">
                <Image src={AiImage} preview={false}></Image>
                <p className="banner__title">AI Based Real-World Examples</p>
                <p className="banner__paragraph">
                  DictionaryApp uses real examples from written and spoken
                  sources. These examples are categorized by difficulty and will
                  be shown to you, according to your level, to maximize your
                  learning efficiency.
                </p>
              </Card>
            </Col>
            <Col>
              <Card className="banner__item">
                <Image src={funImage} preview={false}></Image>
                <p className="banner__title">Fun Learning Tools</p>
                <p className="banner__paragraph">
                  DictionaryApp will help you use what you have learned, in
                  everyday life. It will provide you with entertaining content
                  (including music, movies, books, etc.) suitable to your
                  proficiency level.
                </p>
              </Card>
            </Col>
          </Row>
        </Space>
      </Space>
    </Content>
  );
};

export default Home;
