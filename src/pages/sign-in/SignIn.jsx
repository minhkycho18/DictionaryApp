import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../stores/authenticate/authThunk";
import "./SignIn.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { userInformation, loading, error } = useSelector(
    (state) => state.auth
  );
  const onFinish = (values) => {
    dispatch(signInUser(values));
    if (!loading && error === null) {
      localStorage.setItem("token", userInformation.access_token);
      navigate("/");
    }
    if (error) {
      errorToast();
    }
  };
  const errorToast = () => {
    messageApi.open({
      type: "error",
      content: "Can not sign-in! Please, try again!",
    });
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      {contextHolder}
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          className="input__username input"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
          { minLength: 8 },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          className="input__password input"
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}
        Click! If you <Link className="login-form-forgot">Forgot password</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <span> Or </span>
        <Link to={"/auth/sign-up"}>register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
