import {
  CaretRightOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Collapse,
  Input,
  Modal,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../assets/images/category-back.png";
import { getSubcategory } from "../../../stores/subcategory/subcategoryThunk";
import {
  createNewWL,
  getAllWL,
  getWLById,
} from "../../../stores/word-lists/wordLists-thunk";
import { BiAddToQueue } from "react-icons/bi";
import { FiFolderPlus } from "react-icons/fi";
import "./WordListDetail.scss";
import { cloneWordLists } from "../../../api/WordLists/word-lists.api";
import SubChoice from "../../../components/Category/SubChoice/SubChoice";
import getTokenFromStorage from "../../../helpers/getTokenFromStorage";
import { cloneSubcategory } from "../../../api/Subcategory/subcategory.api";
const WordListDetail = (props) => {
  const [searchParams] = useSearchParams();
  const [query] = useState(searchParams.get("id"));
  const { subcategories } = useSelector((state) => state.subcategory);
  const { selectedWordList, wordLists } = useSelector(
    (state) => state.wordLists
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [api, contextHolderMsg] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddWL, setIsAddWL] = useState(false);
  const [wlTitle, setWlTitle] = useState("");
  const [wlDesc, setWlDesc] = useState("");
  const [wlType, setWlType] = useState("PUBLIC");
  const [subAddedID, setSubAddedID] = useState();
  useEffect(() => {
    dispatch(getWLById(query));
    dispatch(getSubcategory(query));
    dispatch(getAllWL());
    return () => {};
  }, [dispatch, query]);
  const openNotificationWithIcon = (type, msg) => {
    switch (type) {
      case "success":
        api[type]({
          message: "Success",
          description: msg,
        });
        break;
      case "error":
        api[type]({
          message: "Error",
          description: msg,
        });
        break;

      default:
        break;
    }
  };
  const addToWL = async (value) => {
    const params = { ...value, sourceSubcategoryId: subAddedID };
    try {
      const rs = await cloneSubcategory(params);
      if (rs) {
        openNotificationWithIcon("success", "Clone successfully!");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Clone fail! Please try again.");
    }

    setIsModalOpen(false);
  };
  const onHandleEdit = (selectedWordList) => {
    navigate(
      `/dashboard/wordLists/${selectedWordList?.title}/${selectedWordList?.id}`
    );
  };

  const openAddNewWL = () => {
    setIsAddWL(!isAddWL);
  };
  const handleAddNewWL = () => {
    const params = {
      title: wlTitle,
      listDesc: wlDesc,
      listType: wlType,
    };
    dispatch(createNewWL(params));

    setIsAddWL(!isAddWL);
  };
  const handleCloneWLConfirm = async () => {
    try {
      const result = await cloneWordLists(query);
      if (result) {
        openNotificationWithIcon("success", "Clone successfully!");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Clone fail! Please try again.");
    }
    // console.log(result);
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
  const handleCloneSubcategory = (e) => {
    const token = getTokenFromStorage();
    if (token) {
      setSubAddedID(e);
      setIsModalOpen(true);
    } else {
      info();
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const renderSubcategory = subcategories.map((subcategory, index) => (
    <Col key={index} className="col-css">
      <Space className="wldetail__card" direction="vertical">
        <Space>
          <Space className="wldetail__card-title">{subcategory?.title}</Space>
          <Space className="wldetail__card-options"></Space>
        </Space>
        <Space
          style={{
            paddingTop: 64,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Space>
            <Space className="wldetail__card-addLeitner" direction="vertical">
              <Space className="wldetail__card-iconAdd">
                <InboxOutlined />
              </Space>
              to leitner
            </Space>
            {selectedWordList.listType !== "PRIVATE" && (
              <Space
                className="wldetail__card-addLeitner"
                direction="vertical"
                onClick={() => {
                  handleCloneSubcategory(subcategory.subcategoryId);
                }}
              >
                <Space className="wldetail__card-iconAdd">
                  <BiAddToQueue />
                </Space>
                Clone sub
              </Space>
            )}
          </Space>

          <Space
            className="wldetail__card-iconLearn"
            onClick={() =>
              navigate(
                `/vocabulary/${selectedWordList.id}/detail/${subcategory.subcategoryId}/learn`
              )
            }
          >
            Learn
          </Space>
        </Space>
      </Space>
    </Col>
  ));
  const renderItem =
    wordLists &&
    wordLists.map((wl, index) => ({
      key: wl.id,
      label: wl.title,
      children: <SubChoice onAdd={addToWL} wlId={wl.id}></SubChoice>,
      style: {
        marginBottom: 24,
        borderBottom: "1px solid #eee",
        fontWeight: 600,
      },
    }));
  return (
    <Space className="wldetail-wrap" direction="vertical">
      {contextHolder}
      {contextHolderMsg}
      <Space className="wldetail__content wldetail-wrap" direction="vertical">
        <Avatar
          className="wldetail__content-avatar"
          size={156}
          src={logo}
        ></Avatar>
        <Space className="wldetail__content-title">
          {selectedWordList?.title}
        </Space>
        <Space className="wldetail__content-infor">
          Created at{selectedWordList.createdAt}
          {/* Created{calculateDateTime(selectedWordList.createdAt)}days ago */}
        </Space>
        <Space>{selectedWordList.listDesc}</Space>
        <Space
          className="wldetail__content-btn"
          onClick={() => onHandleEdit(selectedWordList)}
        >
          Edit
          <EditOutlined />
        </Space>

        {selectedWordList.listType !== "PRIVATE" && (
          <Space
            className="wldetail__content-btn"
            onClick={() => {
              modal.confirm({
                title: "Clone Wordlist",
                icon: <ExclamationCircleOutlined />,
                content: "Do you want to add this wordlist ?",
                okText: "Ok",
                cancelText: "Cancel",
                onOk: handleCloneWLConfirm,
              });
            }}
          >
            Clone Wordlist
            <FiFolderPlus />
          </Space>
        )}
      </Space>
      <Row className="row-css" gutter={[32, 32]}>
        {renderSubcategory}
      </Row>
      <Modal
        title="Clone a Subcategory"
        open={isModalOpen}
        // onOk={handleOk}
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

export default WordListDetail;
