import { Avatar, Popover, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Authenticate from "../../guards/Auth/Authenticate";
import dashboardLink from "../../routers/dashboard";
import { logOut } from "../../stores/authenticate/authSlice";

const Avt = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            if (link.label === "Sign Out") {
              dispatch(logOut());
              localStorage.removeItem("token");
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
          {userInformation && userInformation?.user.name}
          <Avatar
            size="large"
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            {(userInformation && userInformation?.user.name[0]) || "hung"}
          </Avatar>
        </Space>
      </Popover>
    </Authenticate>
  );
};

export default Avt;
