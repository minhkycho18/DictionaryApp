import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Image, Input, Modal, Popover, Space } from "antd";
import React, { useState } from "react";
import { MdLock, MdOutlinePublic } from "react-icons/md";
import { PiClockCountdown } from "react-icons/pi";
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

  const type = () => {
    const [first, ...rest] = props.wordlist.listType;
    return first + rest.join("").toLowerCase() + "";
  };

  const content = (
    <Space direction="vertical">
      <Space className="option__item" onClick={showModal}>
        <EditOutlined style={{ marginRight: 8 }} />
        Edit
      </Space>
      <Space className="option__item" onClick={showDeleteConfirm}>
        <DeleteOutlined style={{ marginRight: 8 }} />
        Delete
      </Space>
    </Space>
  );
  const handleSelectWordList = (e) => {
    props.onSelect(e);
  };
  const days = calculateDateTime(props.wordlist.createdAt);
  const renderDay = () => {
    if (days > 0) {
      return `Created at ` + days + " days ago";
    } else return "Created today";
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
        <Space>
          {type() === "Public" ? (
            <MdOutlinePublic style={{ fontSize: 16 }} />
          ) : (
            <MdLock style={{ fontSize: 16 }} />
          )}
          {type()}
        </Space>
        <Space>
          <PiClockCountdown style={{ fontSize: 16 }} />
          {renderDay()}
        </Space>
      </Space>
      <Space
        className="ListItem__bottom"
        style={{
          justifyContent: "space-between",
          display: "flex",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={() => handleSelectWordList(props.wordlist)}
      >
        <span
          style={{
            letterSpacing: 1.2,
            textTransform: "uppercase",
            textAlign: "left",
            display: "inline-block",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            float: "left",
            width: 200,
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
