import { EditFilled, MailOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./Profile.scss";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../stores/user/userThunk";
import { RiGenderlessLine } from "react-icons/ri";
import { capitalizeFirstLetter } from "../../../helpers/changeTitle";
const Profile = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <Space className="profile-wrap">
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Space className="profileCard">
        <Space className="profileCard--top">
          <Space className="ava">
            <Avatar
              size={160}
              style={{
                backgroundColor: "#fff",
                color: "#f56a00",
              }}
              className="ava--infor"
            >
              {profile?.name[0]}
            </Avatar>
            <div className="infor__name name">{profile?.name}</div>
          </Space>
        </Space>
        <div className="profileCard--bottom" direction="vertical">
          <Space className="button--wrap" onClick={showModal}>
            <Button className="button--edit">
              Edit Profile
              <EditFilled />
            </Button>
          </Space>
          <Space className="email-group">
            <Space className="email-group__icon">
              <MailOutlined style={{ fontSize: "20px", color: "#000" }} />
            </Space>
            <Space className="email-group__content" direction="vertical">
              <span className="email-group__content--title">Email</span>
              <span className="email-group__content--mail">
                {profile?.email}
              </span>
            </Space>
          </Space>
          <Space className="email-group">
            <Space className="email-group__icon">
              <RiGenderlessLine style={{ fontSize: "20px", color: "#000" }} />
            </Space>
            <Space className="email-group__content" direction="vertical">
              <span className="email-group__content--title">Gender</span>
              <span className="email-group__content--mail">
                {capitalizeFirstLetter(profile?.gender.toLocaleLowerCase())}
              </span>
            </Space>
          </Space>
        </div>
      </Space>
    </Space>
  );
};

export default Profile;
