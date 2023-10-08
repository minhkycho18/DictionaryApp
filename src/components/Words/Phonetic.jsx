import { SoundFilled } from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import React from "react";
import uk from "../../assets/images/en-circle.png";
import us from "../../assets/images/us-square.png";
import "./Phonetic.scss";
import Meaning from "./Meaning";
import Examples from "./Examples";
const Phonetic = (props) => {
  // const { word } = useSelector((state) => state.search);

  return (
    <div>
      <Row gutter={[32, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <Space className="wrappered border border--blue">
            <Space direction="vertical" wrap>
              <Space className="phonetic">
                <Space className="phonetic__word">{props.content?.word}</Space>
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
                <Avatar src={uk} className="language__flag"></Avatar>
                <span className="phonetic__content">
                  {props.content?.phoneUk}
                </span>
              </Space>
              <Space
                style={{
                  paddingTop: "16px",
                  alignItems: "start",
                  display: "flex",
                }}
              >
                <Avatar src={us} className="language__flag"></Avatar>
                <span className="phonetic__content">
                  {props.content?.phoneUs}
                </span>
              </Space>
            </Space>
            <span className="phonetic__type">[{props.content?.pos}]</span>
          </Space>
          <Meaning definitions={props.content?.definitions} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Examples />
        </Col>
      </Row>
    </div>
  );
};

export default Phonetic;
// definitions:Array(1)
// 0:"a jury that is unable to agree on a verdict; the result is a mistrial"
// length: 1
// [[Prototype]]:Array(0)
// id: 48626
// phoneUk: null
// phoneUs: null
// pos: "noun"
// word:"hung jury"
