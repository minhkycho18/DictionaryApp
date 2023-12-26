import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../stores/authenticate/authThunk";
import "./SignIn.scss";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { userInformation, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInformation) {
      if (userInformation?.user?.role?.name === "LEARNER") {
        navigate("/");
      } else {
        navigate("/manager/vocabulary");
      }
    }

    if (error) {
      messageApi.open({
        type: "error",
        content: error,
        duration: 2,
      });
    }
    return () => {};
  }, [error, messageApi, navigate, userInformation]);

  const onFinish = (values) => {
    dispatch(signInUser(values));
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
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          className="input__password input"
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
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
