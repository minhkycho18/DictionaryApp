import { Avatar, Modal, Space } from "antd";
import React from "react";
import uk from "../../assets/images/en-circle.png";
import { BiSolidVolumeFull } from "react-icons/bi";
import us from "../../assets/images/us-square.png";
import "./VocabularyDetailModal.scss";
import { upperFirst } from "lodash/string";

const VocabularyDetailModal = ({ vocabDetail, isOpen, handleShow }) => {
  console.log(vocabDetail);
  const handleCancel = () => {
    handleShow();
  };
  const renderDefinitions = vocabDetail?.definitions.map(
    (definition, index) => (
      <div key={definition.defId} className="group-meaning">
        <div className="meaning__content">
          <span className="meaning__content--num">{index + 1}.</span>{" "}
          <span>{definition.wordDesc}</span>
        </div>
        {definition?.examples && (
          <Space className="example">
            <span>Example:</span>
            <span className="example__word">{definition?.examples}</span>
          </Space>
        )}
        {definition?.synonyms.length > 0 && (
          <Space className="synonym">
            <span>Synonyms:</span>
            {definition?.synonyms.map((synonym) => (
              <span key={synonym} className="synonym__word">
                {synonym}
              </span>
            ))}
          </Space>
        )}
      </div>
    )
  );

  return (
    <Modal open={isOpen} onCancel={handleCancel} footer={false} width={650}>
      <Space direction="vertical" wrap>
        <Space className="phonetic">
          <span className="phonetic__word">{vocabDetail?.word}</span>
          <span className="phonetic__pos">
            [ {upperFirst(vocabDetail?.pos)} ]
          </span>
        </Space>

        {vocabDetail.audioUk && (
          <Space className="phonetic__symbol">
            <Avatar src={uk} className="language__flag"></Avatar>
            <span className="phonetic__content">
              {vocabDetail?.phoneUk}
              <BiSolidVolumeFull
                className="phonetic__icon"
                onClick={() => new Audio(vocabDetail.audioUk).play()}
              />
            </span>
          </Space>
        )}
        {vocabDetail.audioUs && (
          <Space className="phonetic__symbol">
            <Avatar src={us} className="language__flag"></Avatar>
            <span className="phonetic__content">
              {vocabDetail?.phoneUs}
              <BiSolidVolumeFull
                className="phonetic__icon"
                onClick={() => new Audio(vocabDetail.audioUs).play()}
              />
            </span>
          </Space>
        )}
      </Space>

      <Space className="meaning__content" direction="vertical">
        {renderDefinitions}
      </Space>
    </Modal>
  );
};

export default VocabularyDetailModal;
