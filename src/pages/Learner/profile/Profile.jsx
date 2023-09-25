import { EditFilled, MailOutlined } from "@ant-design/icons";
import { Avatar, Button, Space } from "antd";
import React from "react";
import "./Profile.scss";
const Profile = () => {
  return (
    <Space className="wrap">
      <Space className="profileCard">
        <Space className="profileCard--top">
          <Space className="ava">
            <Avatar
              size={160}
              style={{
                backgroundColor: "#fff",
                color: "#f56a00",
              }}
              className="infor__ava ava--infor"
            >
              H
            </Avatar>
            <div className="infor__name name">Nguyen Hung</div>
          </Space>
        </Space>
        <Space className="profileCard--bottom" direction="vertical">
          <Space className="button--wrap">
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
                heo7674@gmail.com
              </span>
            </Space>
          </Space>
        </Space>
      </Space>
    </Space>
  );
};

export default Profile;
