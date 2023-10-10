import { Avatar, Popover, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Authenticate from "../../guards/Auth/Authenticate";
import dashboardLink from "../../routers/dashboard";

const Avt = (props) => {
  const navigate = useNavigate();
  const { userInformation } = useSelector((state) => state.auth);
  const content = (
    <Space direction="vertical" className="options">
      {dashboardLink.map((link, index) => (
        <Space
          key={index}
          className={`options__item ${
            link.label === "Sign Out" ? "sign_out" : ""
          }`}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/auth/sign-in");
          }}
        >
          <Space className="options__icon">{link?.icon}</Space>
          <span className="options__label">{link?.label}</span>
        </Space>
      ))}
    </Space>
  );
  return (
    <Authenticate>
      <Popover placement="bottom" trigger="click" content={content}>
        <Space className="login">
          {userInformation.user.name || "hung"}
          <Avatar
            size="large"
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            {userInformation.user.name[0] || "hung"}
          </Avatar>
        </Space>
      </Popover>
    </Authenticate>
  );
};

export default Avt;
