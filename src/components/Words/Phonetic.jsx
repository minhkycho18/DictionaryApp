import { SoundFilled } from "@ant-design/icons";
import { Avatar, Col, Row, Space, message } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import uk from "../../assets/images/en-circle.png";
import us from "../../assets/images/us-square.png";
import { getAllWL } from "../../stores/word-lists/wordLists-thunk";
import Examples from "./Examples";
import Meaning from "./Meaning";
import "./Phonetic.scss";
const Phonetic = () => {
  const { vocabDetails } = useSelector((state) => state.search);
  const [messageApi, contextHolder] = message.useMessage();

  const audioUk = useRef();
  const audioUs = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWL());
  }, [dispatch]);

  const renderExamples = () => {
    const examples = [];
    vocabDetails.forEach((vocabDetail) => {
      vocabDetail.definitions.forEach((definition) => {
        if (definition.examples) {
          examples.push(definition.examples);
        }
      });
    });
    return examples;
  };
  const renderDefinitions = vocabDetails.map((item) => (
    <Meaning key={item.id} detail={item} />
  ));

  const pos = vocabDetails.map((item) => (
    <span key={item.id} className="phonetic__type">
      [{item?.pos}]
    </span>
  ));
  const defaultWord = vocabDetails[0];
  const handlePlayAudio = (type) => {
    if (type === "uk" && defaultWord.audioUk) {
      audioUk.current.volume = 0.4;
      audioUk.current.play();
    } else if (type === "us" && defaultWord.audioUs) {
      audioUs.current.volume = 0.4;
      audioUs.current.play();
    } else {
      messageApi.error("Invalid phonetic");
    }
  };
  return (
    <div>
      {contextHolder}
      <Row gutter={[32, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <Space className="wrappered border border--blue">
            <Space direction="vertical" wrap>
              <Space className="phonetic">
                <Space className="phonetic__word">{defaultWord?.word}</Space>
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
                  {defaultWord?.phoneUk}
                  <SoundFilled
                    className="phonetic__icon "
                    onClick={() => handlePlayAudio("uk")}
                  />
                  {defaultWord?.audioUk && (
                    <audio
                      id="ukAudio"
                      ref={audioUk}
                      src={defaultWord?.audioUk}
                    ></audio>
                  )}
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
                  {defaultWord?.phoneUs}
                  <SoundFilled
                    className="phonetic__icon"
                    onClick={() => handlePlayAudio("us")}
                  />
                  {defaultWord?.audioUs && (
                    <audio
                      id="usAudio"
                      ref={audioUs}
                      src={defaultWord?.audioUs}
                    ></audio>
                  )}
                </span>
              </Space>
            </Space>
            <Space>{pos}</Space>
          </Space>
          {renderDefinitions}
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <Examples examples={renderExamples()} />
        </Col>
      </Row>
    </div>
  );
};

export default Phonetic;
