import { Avatar, Image, Popover, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoMain.png";
import dashboardLink from "../../routers/dashboard";
import "./Header.scss";
import changeTitle from "../../helpers/changeTitle";
const Header = () => {
  const { pathname } = useLocation();
  const [isScroll, setIsScroll] = useState();
  const navigate = useNavigate();
  changeTitle(pathname);
  useEffect(() => {
    // document.title = "a";
    const handleScroll = () => {
      if (window.scrollY > 630) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Vocabulary",
      href: "/vocabulary",
    },

    {
      label: "Dictionary",
      href: "/dictionary",
    },
  ];
  const navItems = links.map((item, index) => {
    return (
      <div key={index} className="nav__item ">
        <Link
          className={`nav__item-content ${
            pathname === item.href ? "active" : ""
          }`}
          to={item.href}
        >
          {item.label}
        </Link>
      </div>
    );
  });

  const content = (
    <Space direction="vertical" className="options">
      {dashboardLink.map((link, index) => (
        <Space
          key={index}
          className={`options__item ${
            link.label === "Sign Out" ? "sign_out" : ""
          }`}
          onClick={() => navigate(`/dashboard${link?.path}`)}
        >
          <Space className="options__icon">{link?.icon}</Space>
          <span className="options__label">{link?.label}</span>
        </Space>
      ))}
    </Space>
  );
  return (
    <Space className={`menu ${isScroll ? "menu__scrolled" : ""}`}>
      <Space className="nav">
        <Image src={logo} preview={false} width={48}></Image>
        {navItems}
      </Space>
      <Popover placement="bottom" trigger="click" content={content}>
        <Space className="login">
          Nguyen Hung
          <Avatar
            size="large"
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
            }}
          >
            H
          </Avatar>
        </Space>
      </Popover>
    </Space>
  );
};

export default Header;
