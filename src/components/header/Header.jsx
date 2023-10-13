import { Image, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoMain.png";
import Avt from "../../components/header/Avt";
import changeTitle from "../../helpers/changeTitle";
import "./Header.scss";
import SignInBtn from "./SignInBtn";
import { getUserProfile } from "../../stores/user/userThunk";
import { useDispatch } from "react-redux";

const Header = () => {
  const { pathname } = useLocation();
  const [isScroll, setIsScroll] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  changeTitle(pathname);
  useEffect(() => {
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserProfile());
      setIsLogin(true);
    }
  }, [dispatch]);

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

  return (
    <Space className={`menu ${isScroll ? "menu__scrolled" : ""}`}>
      <Space className="nav">
        <Image src={logo} preview={false} width={48}></Image>
        {navItems}
      </Space>
      {isLogin ? <Avt /> : <SignInBtn />}
    </Space>
  );
};

export default Header;
