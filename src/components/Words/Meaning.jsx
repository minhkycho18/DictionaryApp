import {
  BookOutlined,
  CaretRightOutlined,
  InboxOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Collapse, Modal, Space } from "antd";
import React, { useState } from "react";
import "./Meaning.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addWordToSubcategory,
  getSubcategory,
} from "../../stores/subcategory/subcategoryThunk";
import { setVocabDetails } from "../../stores/search-word/searchSlice";
const Meaning = ({ detail }) => {
  const [isChoice, setIsChoice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wordLists } = useSelector((state) => state.wordLists);
  const { subcategories } = useSelector((state) => state.subcategory);
  const [wlAdded, setWlAdded] = useState();
  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAddLeitner = (e) => {
    setIsChoice(!isChoice);
  };
  const handleAddWordlist = (e) => {
    setWlAdded(e);
    setIsModalOpen(true);
  };
  const addToWL = (value) => {
    const params = { ...value, vocabId: detail.id, defId: wlAdded };
    dispatch(addWordToSubcategory(params));
    dispatch(setVocabDetails(detail.word));
    setIsModalOpen(false);
  };

  const renderDefinitions = detail.definitions.map((definition, index) => (
    <div key={definition.defId} className="group-meaning">
      <div className="meaning__content">
        <span className="meaning__content--num">{index + 1}.</span>{" "}
        <span>{definition.wordDesc}</span>
      </div>
      {definition.synonyms.length > 0 && (
        <Space className="synonyms">
          <span>Synonyms:</span>
          {definition?.synonyms.map((synonym, index) => (
            <span key={index} className="synonyms__word">
              {synonym}
            </span>
          ))}
        </Space>
      )}
      <Space className="choice">
        <div
          className={`choice__item ${
            definition?.isWordOfUserLeitner ? "icon--active" : ""
          }`}
          onClick={handleAddLeitner}
        >
          <InboxOutlined className="choice__icon " />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
        <div
          className={`choice__item ${
            definition.isWordOfUserWordlist ? "icon--active" : ""
          }`}
          onClick={() => handleAddWordlist(definition.defId)}
        >
          <BookOutlined className="choice__icon" />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
      </Space>
    </div>
  ));

  const posClass = () => {
    switch (detail.pos) {
      case "adverb":
        return "border--lightblue";
      case "verb":
        return "border--orange";
      case "adjective":
        return "border--pink";

      default:
        return "border--lightblue";
    }
  };

  const renderItem = wordLists.map((wl, index) => ({
    key: wl.id,
    label: wl.title,
    children: (
      <Space direction="vertical" style={{ width: "100%" }}>
        {subcategories.map((sub, index) => (
          <Space
            className="item__category"
            key={sub.subcategoryId}
            onClick={() =>
              addToWL({ wordListId: wl.id, SubId: sub.subcategoryId })
            }
          >
            <Space style={{ padding: "0px 16px" }}>{sub.title}</Space>
          </Space>
        ))}
      </Space>
    ),
    style: {
      marginBottom: 24,
      borderBottom: "1px solid #eee",
      fontWeight: 600,
    },
  }));
  const handleChangeWL = (key) => {
    dispatch(getSubcategory(key));
  };
  return (
    <Space className={`wrap-meaning border ${posClass()}`} direction="vertical">
      <Space style={{ width: "100%", justifyContent: "space-between" }}>
        <h1>{detail.word}</h1>
        <p style={{ fontSize: 20, fontWeight: 500 }}>[{detail.pos}]</p>
      </Space>
      <Space className="meaning__content" direction="vertical">
        {renderDefinitions}
      </Space>
      <Modal
        title="Add to a Subcategory"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Collapse
          // defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          ghost
          items={renderItem}
          accordion
          onChange={handleChangeWL}
          className="collapse__item"
        />
      </Modal>
    </Space>
  );
};

export default Meaning;
