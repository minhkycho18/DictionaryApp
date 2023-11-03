import {
  CaretRightOutlined,
  FolderOutlined,
  InboxOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Input, Modal, Select, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getTokenFromStorage from "../../helpers/getTokenFromStorage";
import { setErrorAdd } from "../../stores/search-word/searchSlice";
import { addWordToSubcategory } from "../../stores/subcategory/subcategoryThunk";
import { createNewWL } from "../../stores/word-lists/wordLists-thunk";
import SubChoice from "../Category/SubChoice/SubChoice";
import "./Meaning.scss";
const Meaning = ({ detail }) => {
  const [isChoice, setIsChoice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wordLists } = useSelector((state) => state.wordLists);
  const { errorAdd, loadingAdd } = useSelector((state) => state.search);
  const [wlAdded, setWlAdded] = useState();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isAddWL, setIsAddWL] = useState(false);
  const [wlTitle, setWlTitle] = useState("");
  const [wlDesc, setWlDesc] = useState("");
  const [wlType, setWlType] = useState("PUBLIC");

  useEffect(() => {
    // if (errorAdd) {
    //   // messageApi.error("This word has been added");
    // }
    return () => {
      dispatch(setErrorAdd());
    };
  }, [dispatch, loadingAdd, messageApi]);

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
    const token = getTokenFromStorage();
    if (token) {
      setWlAdded(e);
      setIsModalOpen(true);
    } else {
      info();
    }
  };
  const addToWL = (value) => {
    const params = { ...value, vocabId: detail.id, defId: wlAdded };
    const dp = dispatch(addWordToSubcategory(params));
    dp.unwrap()
      .then((rs) => messageApi.success("Successful !"))
      .catch((rs) => messageApi.error("This word has been added"));
    setIsModalOpen(false);
  };

  const info = () => {
    Modal.confirm({
      title: "Login",
      okText: "Sign In",
      cancelText: "Cancel",
      onOk() {
        navigate("/auth/sign-in");
      },
      onCancel() {},
      content: (
        <Space className="popconfirm-text">
          <p>In order to add the word to your categories you must sign in.</p>
        </Space>
      ),
    });
  };

  const openAddNewWL = () => {
    handleSetInputDefault();
    setIsAddWL(!isAddWL);
  };
  const handleAddNewWL = () => {
    const params = {
      title: wlTitle,
      listDesc: wlDesc,
      listType: wlType,
    };
    dispatch(createNewWL(params));

    handleSetInputDefault();
    setIsAddWL(!isAddWL);
  };
  const handleSetInputDefault = () => {
    setWlTitle("");
    setWlDesc("");
    setWlType("PUBLIC");
  };

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

  const renderDefinitions = detail.definitions.map((definition, index) => (
    <div key={definition.defId} className="group-meaning">
      <div className="meaning__content">
        <span className="meaning__content--num">{index + 1}.</span>{" "}
        <span>{definition.wordDesc}</span>
      </div>
      {definition.synonyms.length > 0 && (
        <Space className="synonyms">
          <Space>Synonyms:</Space>
          {definition?.synonyms.map((synonym, index) => (
            <Space key={index} className="synonyms__word">
              {synonym}
            </Space>
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
          <FolderOutlined className="choice__icon" />
          <PlusCircleFilled className="choice__icon--sub" />
        </div>
      </Space>
    </div>
  ));

  const renderItem =
    wordLists &&
    wordLists.map((wl, index) => ({
      key: wl.id,
      label: wl.title,
      children: (
        <SubChoice
          onAdd={addToWL}
          wlId={wl.id}
          vocabId={detail.id}
          defId={wlAdded}
        ></SubChoice>
      ),
      style: {
        marginBottom: 24,
        borderBottom: "1px solid #eee",
        fontWeight: 600,
      },
    }));

  return (
    <Space className={`wrap-meaning border ${posClass()}`} direction="vertical">
      {contextHolder}
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
        className="Modal_WL"
      >
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          ghost
          items={renderItem}
          accordion
          className="collapse__item"
        />
        <Space className="AddNewWL_btn" direction="vertical">
          {!isAddWL && (
            <Space onClick={openAddNewWL}>
              <PlusOutlined className="AddNewWL_btn__icon" />
              <div className="AddNewWL_btn__content">Add new wordlist</div>
            </Space>
          )}
          {isAddWL && (
            <Space className="form-wrap" direction="vertical">
              <Space className="form-add" direction="vertical">
                <div className="form-label">Title:</div>
                <Input
                  placeholder="title"
                  onChange={(e) => setWlTitle(e.target.value)}
                  value={wlTitle}
                ></Input>
                <div className="form-label">Descriptions:</div>
                <Input.TextArea
                  placeholder="Descriptions"
                  onChange={(e) => setWlDesc(e.target.value)}
                  value={wlDesc}
                ></Input.TextArea>
                <div className="form-label">Type:</div>
                <Select
                  placeholder="Select your type"
                  onSelect={(e) => setWlType(e)}
                  defaultValue={wlType}
                  style={{
                    width: "100px",
                  }}
                >
                  <Select.Option value="PUBLIC">Public</Select.Option>
                  <Select.Option value="PRIVATE">Private</Select.Option>
                </Select>
                <Space style={{ marginTop: 8 }}>
                  <Button
                    className="form-btn--submit"
                    type="primary"
                    onClick={handleAddNewWL}
                  >
                    Submit
                  </Button>
                  <Button onClick={openAddNewWL}>Cancel</Button>
                </Space>
              </Space>
            </Space>
          )}
        </Space>
      </Modal>
    </Space>
  );
};

export default Meaning;
