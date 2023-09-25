import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";
import "./Auth.scss";
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsSignIn(pathname.match("sign-in"));
  }, [pathname]);

  return (
    <Space className="auth_wrap">
      <Space className="auth__background"> </Space>

      <Space className="auth__content" direction="vertical">
        <Space className="auth__title">
          Sign {isSignIn ? "in" : "up"} to Dictionary App
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
