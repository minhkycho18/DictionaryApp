import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../stores/authenticate/authThunk";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { userInformation, loading, error } = useSelector(
    (state) => state.auth
  );
  const errorToast = () => {
    messageApi.open({
      type: "error",
      content: "Can not register!",
    });
  };

  const onFinish = (values) => {
    const { confirm, agreement, ...formValue } = {
      confirm: values.confirm,
      agreement: values.agreement,
      ...values,
    };
    if (confirm && agreement) {
      dispatch(signUpUser({ ...formValue, roleId: 1 }));
      if (!loading && error === null) {
        localStorage.setItem("token", userInformation.access_token);
        navigate("/");
      }
      if (error) {
        errorToast();
      }
    }
  };

  return (
    <>
      {contextHolder}

      <Link
        to={"/auth/sign-in"}
        style={{
          display: "flex",
          marginLeft: -64,
          color: "#0e336b",
        }}
      >
        <ArrowLeftOutlined
          style={{
            color: "#0e336b",
            fontSize: "24px",
            marginRight: 8,
          }}
        />
        Back
      </Link>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input style={{ marginLeft: 32 }} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password style={{ marginLeft: 32 }} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Do not match!"));
              },
            }),
          ]}
        >
          <Input.Password style={{ marginLeft: 32 }} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input style={{ marginLeft: 32 }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select style={{ marginLeft: 32 }} placeholder="select your gender">
            <Option value="MALE">Male</Option>
            <Option value="FEMALE">Female</Option>
            {/* <Option value="other">Other</Option> */}
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox style={{ marginLeft: 32 }}>
            I have read the <Link href="">agreement</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
