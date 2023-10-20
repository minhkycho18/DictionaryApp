import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Image, Input, Modal, Popover, Space } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import category from "../../assets/images/category-back.png";
import calculateDateTime from "../../helpers/calculateDateTime";
import { updateWl } from "../../stores/word-lists/wordLists-thunk";
import "./ListItem.scss";

const ListItem = (props) => {
  const { confirm } = Modal;
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(props.wordlist?.title);
  const [newDesc, setNewDesc] = useState(props.wordlist?.listDesc);
  const dispatch = useDispatch();
  const showDeleteConfirm = () => {
    setIsOpenModel(true);
    confirm({
      title: "Are you sure delete this Word List?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        props.onDel(props.wordlist.id);
        setIsOpenModel(false);
      },
      onCancel() {
        setIsOpenModel(false);
      },
    });
  };
  const showModal = () => {
    setOpen(true);
  };
  const newData = {
    id: props.wordlist.id,
    title: newTitle,
    listDesc: newDesc,
    listType: props.wordlist.listType,
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(updateWl(newData));
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const content = (
    <Space wrap direction="vertical">
      <Space style={{ cursor: "pointer" }} onClick={showModal}>
        <EditOutlined style={{ marginRight: 8 }} />
        Edit
      </Space>
      <Space style={{ cursor: "pointer" }} onClick={showDeleteConfirm}>
        <DeleteOutlined style={{ marginRight: 8 }} />
        Delete
      </Space>
    </Space>
  );
  const handleSelectWordList = (e) => {
    props.onSelect(e);
  };
  return (
    <Space className="MyWordLists__item ListItem" direction="vertical">
      <Modal
        title="Edit"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="ModalEdit_wrap"
      >
        <Space className="ModalEdit" direction="vertical">
          <label htmlFor="inputTitle">Title:</label>
          <Input
            name="inputTitle"
            className="ModalEdit_input"
            type="text"
            placeholder="Input new title.."
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          ></Input>
          <label htmlFor="inputDesc">Description:</label>
          <Input
            name="inputDesc"
            className="ModalEdit_input"
            type="text"
            placeholder="Input new desc.."
            onChange={(e) => setNewDesc(e.target.value)}
            value={newDesc}
          ></Input>
        </Space>
      </Modal>
      <Space className="ListItem__top">
        <Image className="" width={100} src={category} preview={false}></Image>
        <Popover
          title=" "
          trigger="hover"
          showArrow="hide"
          placement="bottomRight"
          // className="pop"
          content={content}
          style={{ zIndex: 1 }}
          popupVisible={!isOpenModel}
        >
          <MoreOutlined
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#aaa",
              cursor: "pointer",
            }}
            className="icon-hover"
          />
        </Popover>
      </Space>
      <Space direction="vertical" className="ListItem__middle">
        <span>1-sublist</span>
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Created at {calculateDateTime(props.wordlist.createdAt)} days ago
        </span>
      </Space>
      <Space
        className="ListItem__bottom"
        style={{
          justifyContent: "space-between",
          display: "flex",
          cursor: "pointer",
        }}
        onClick={() => handleSelectWordList(props.wordlist)}
      >
        <span
          style={{
            letterSpacing: 1.2,
            textTransform: "uppercase",
            textAlign: "center",
            marginLeft: 8,
          }}
        >
          {props.wordlist?.title}
        </span>
        <RightOutlined />
      </Space>
    </Space>
  );
};

export default ListItem;
