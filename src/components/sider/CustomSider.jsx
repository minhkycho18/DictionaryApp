import { Avatar, Image, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoMain.png";
import dashboardLink from "../../routers/dashboard";
import { logOut } from "../../stores/authenticate/authSlice";
import "./CustomSider.scss";
import getFullPath from "../../helpers/getPath";
import { getUserProfile } from "../../stores/user/userThunk";

const CustomSider = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = getFullPath(pathname);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile());
    return () => {};
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Sider collapsed={false} className="sidermenu">
      <Space direction="vertical" className="infor">
        <Space className="infor__logo" onClick={() => navigate("/")}>
          <Image src={logo} preview={false} width={48} />
          Dictionary
        </Space>
        <Avatar
          size={96}
          style={{
            backgroundColor: "#fff",
            color: "#f56a00",
          }}
          className="infor__ava "
        >
          {profile?.name[0]}
        </Avatar>

        <span className="infor__name">{profile?.name}</span>
      </Space>
      <Space className="menu2" direction="vertical">
        {dashboardLink.map((link, index) => (
          <Space
            key={index}
            className={`menu2__item ${
              path[1].link === "/dashboard" + link?.path
                ? "menu2__item--active"
                : ""
            }`}
            onClick={() => {
              if (link.label === "Sign Out") {
                handleSignOut();
              } else navigate(`/dashboard${link?.path}`);
            }}
          >
            <Space className="menu2__item--icon">{link?.icon}</Space>
            {link?.label}
          </Space>
        ))}
      </Space>
    </Sider>
  );
};

export default CustomSider;
