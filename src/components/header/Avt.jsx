import { Avatar, Popover, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Authenticate from "../../guards/Auth/Authenticate";
import dashboardLink from "../../routers/dashboard";
import { logOut } from "../../stores/authenticate/authSlice";
import deleteToken from "../../helpers/deleteToken";

const Avt = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const content = (
    <Space direction="vertical" className="options">
      {dashboardLink.map((link, index) => (
        <Space
          key={index}
          className={`options__item ${
            link.label === "Sign Out" ? "sign_out" : ""
          }`}
          onClick={() => {
            if (link.label === "Sign Out") {
              dispatch(logOut());
              // localStorage.removeItem("token");
              deleteToken();
              navigate("/auth/sign-in");
            } else navigate(`/dashboard${link.path}`);
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
          {props?.profile && props?.profile?.name}
          <Avatar
            size="large"
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            {props?.profile && props?.profile?.name[0]}
          </Avatar>
        </Space>
      </Popover>
    </Authenticate>
  );
};

export default Avt;
