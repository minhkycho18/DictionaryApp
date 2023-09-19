import { Avatar, Image, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoMain.png";
import dashboardLink from "../../routers/dashboard";
import "./CustomSider.scss";
const CustomSider = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const a = useLocation();
  // console.log(a);
  return (
    <Sider collapsed={false} width={286} className="sidermenu">
      <Space direction="vertical" className="infor">
        <Link className="infor__logo" to={"/home"}>
          <Image src={logo} preview={false} width={48} />
          Vocab
        </Link>
        <Avatar
          size={96}
          style={{
            backgroundColor: "#fff",
            color: "#f56a00",
          }}
          className="infor__ava "
        >
          H
        </Avatar>

        <span className="infor__name">Nguyen Hung</span>
      </Space>
      <Space className="menu2" direction="vertical">
        {dashboardLink.map((link, index) => (
          <Space
            key={index}
            className={`menu2__item ${
              pathname === "/dashboard" + link?.path
                ? "menu2__item--active"
                : ""
            }`}
            onClick={() => navigate(`/dashboard${link?.path}`)}
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
