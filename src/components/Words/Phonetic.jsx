import { ExclamationCircleOutlined, SoundFilled } from "@ant-design/icons";
import { Avatar, Col, Modal, Row, Space, message } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteVocabInLeitner } from "../../api/Leitner/leitner.api";
import uk from "../../assets/images/en-circle.png";
import us from "../../assets/images/us-square.png";
import { updateLeitnerAdd } from "../../stores/search-word/searchSlice";
import { addWordToLeitner } from "../../stores/subcategory/subcategoryThunk";
import { getAllWL } from "../../stores/word-lists/wordLists-thunk";
import Examples from "./Examples";
import Meaning from "./Meaning";
import "./Phonetic.scss";
const Phonetic = () => {
  const { vocabDetails } = useSelector((state) => state.search);
  const [messageApi, contextHolder] = message.useMessage();
  const [modal, contextHolderModal] = Modal.useModal();

  const audioUk = useRef();
  const audioUs = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWL());
  }, [dispatch]);
  const defaultWord = vocabDetails[0];

  const handleCancel = () => {};
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
  const handleAddLeitner = async (dataInput) => {
    const { isWordOfUserLeitner, vocabId, defId } = dataInput[0];

    const updatedData = vocabDetails.map((vocab) => {
      if (vocab.id === vocabId) {
        const updatedDef = vocab.definitions.map((definition) => {
          if (definition.defId === defId) {
            return {
              ...definition,
              isWordOfUserLeitner: !isWordOfUserLeitner,
            };
          } else return definition;
        });
        return {
          ...vocab,
          definitions: updatedDef,
        };
      } else return vocab;
    });
    const handleOk = async () => {
      try {
        const rs = await deleteVocabInLeitner([{ vocabId, defId }]);
        messageApi.success(rs);
        dispatch(updateLeitnerAdd(updatedData));
      } catch (error) {
        console.log(error);
      }
    };
    if (!isWordOfUserLeitner) {
      try {
        const result = await dispatch(
          addWordToLeitner([{ vocabId, defId }])
        ).unwrap();
        messageApi.success(result);
        dispatch(updateLeitnerAdd(updatedData));
      } catch (error) {
        console.log(error);
      }
    } else
      modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleOutlined style={{ color: "red" }} />,
        content: (
          <Space direction="vertical">
            <Space>Would you like to remove this word?</Space>
            {/* <Space>{error}</Space> */}
          </Space>
        ),
        okText: "Ok",
        okButtonProps: {
          danger: true,
        },
        cancelText: "Cancel",
        onOk: handleOk,
        onCancel: handleCancel,
      });
  };
  const renderDefinitions = vocabDetails.map((item) => (
    <Meaning key={item.id} detail={item} handleAddLeitner={handleAddLeitner} />
  ));

  const pos = vocabDetails.map((item) => (
    <span key={item.id} className="phonetic__type">
      [{item?.pos}]
    </span>
  ));
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
      {contextHolderModal}
      <Row gutter={[32, 16]}>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <Space className="wrappered border border--default">
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
