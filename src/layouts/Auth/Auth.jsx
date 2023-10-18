import { Image, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";
import "./Auth.scss";
import logo from "../../assets/images/logoMain-removebg-preview.png";
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setIsSignIn(pathname.match("sign-in"));
  }, [pathname]);
  const handleBackHome = () => {
    navigate("/");
  };
  return (
    <Space className="auth_wrap">
      <Space className="auth__background"> </Space>
      <Space className="auth__content" direction="vertical">
        <Image
          src={logo}
          preview={false}
          width={80}
          style={{ cursor: "pointer" }}
          onClick={handleBackHome}
        />

        <Space className="auth__title">
          Sign {isSignIn ? "in" : "up"} to{" "}
          <span style={{ cursor: "pointer" }} onClick={handleBackHome}>
            Dictionary App
          </span>
        </Space>
        <Space className="auth__description">
          If you are not already a member, By signing in you will be
          automatically registered.
        </Space>
        {isSignIn ? <SignIn /> : <SignUp />}
      </Space>
    </Space>
  );
};

export default Auth;
