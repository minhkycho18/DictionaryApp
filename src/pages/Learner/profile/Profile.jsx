import { EditFilled, LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./Profile.scss";
// import { useNavigate } from "react-router-dom";
import { RiGenderlessLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../api/User/user";
import { capitalizeFirstLetter } from "../../../helpers/changeTitle";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../stores/user/userThunk";
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
const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formValues, setFormValues] = useState({
    ...profile,
    password: null,
    confirm: null,
    oldPassword: null,
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [formValues, form]);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const showModal = (type) => {
    setType(type);
    setOpen(true);
  };
  const handleFormChange = (changedValues, allValues) => {
    setFormValues(allValues);
    setIsFormChanged(true); // Khi có sự thay đổi, enable nút Confirm
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    if (type === "profile") {
      try {
        dispatch(updateUserProfile({ name: values?.name, image: "" }));
        messageApi.success("Update successful!");
        setOpen(false);
        form.setFieldsValue({
          ...formValues,
          name: values?.name,
          image: "",
        });
        setIsFormChanged(false);
      } catch (error) {
        messageApi.error(error);
      }
      setType("");
    }
    if (type === "password") {
      const { password, confirm, oldPassword } = values;
      const getPasswordUpdate = async (data) => {
        try {
          const rs = await changePassword(data);
          if (rs) {
            messageApi.success(rs);
            setOpen(false);
            form.setFieldsValue(formValues);
            setType("");
          }
        } catch (error) {
          messageApi.error(error);
        }
      };
      if (password === confirm) {
        getPasswordUpdate({ newPassword: password, oldPassword });
      } else {
        messageApi.error("New password does not match confirmation password!");
      }
    }
  };

  const renderProfile = (
    <Form
      {...formItemLayout}
      form={form}
      name="profile"
      onFinish={onFinish}
      onValuesChange={handleFormChange}
    >
      <Form.Item name="email" label="E-mail">
        <Input value={profile?.email} disabled />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="gender" label="Gender" rules={[]}>
        <Select placeholder="select your gender" disabled>
          <Select.Option value="MALE">Male</Select.Option>
          <Select.Option value="FEMALE">Female</Select.Option>
          <Select.Option value="OTHER">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={!isFormChanged}>
          Confirm
        </Button>
        <Button type="" onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
  const renderPasswordChange = (
    <Form {...formItemLayout} form={form} name="profile" onFinish={onFinish}>
      <Form.Item
        name="oldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
          {
            min: 6,
            message: "At least 6 characters long.",
          },
          {
            pattern: /^\S*$/,
            message: "Password cannot contain spaces.",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="password"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please input your new password!",
          },
          {
            min: 6,
            message: "At least 6 characters long.",
          },
          {
            pattern: /^\S*$/,
            message: "Password cannot contain spaces.",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("oldPassword") !== value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "The new password must be different from the old password!"
                )
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
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
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
        <Button type="" onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
  // const =
  return (
    <Space className="profile-wrap">
      <Modal
        title="Edit Profile"
        open={open}
        footer={false}
        onCancel={handleCancel}
      >
        {type === "profile" ? renderProfile : renderPasswordChange}
      </Modal>
      {contextHolder}
      <Space className="profileCard">
        <Space className="profileCard--top">
          <Space className="ava">
            {profile?.image && (
              <Avatar
                size={160}
                style={{
                  backgroundColor: "#fff",
                  color: "#f56a00",
                  fontSize: 32,
                }}
                className="ava--infor"
              >
                {profile?.name[0]}
              </Avatar>
            )}

            <div className="infor__name name">{profile?.name}</div>
          </Space>
        </Space>
        <div className="profileCard--bottom" direction="vertical">
          <Space className="button--wrap" onClick={() => showModal("profile")}>
            <Button className="button--edit">
              Edit Profile
              <EditFilled />
            </Button>
          </Space>
          <Space className="email-group">
            <Space className="email-group__icon">
              <MailOutlined style={{ fontSize: "20px", color: "#000" }} />
            </Space>
            <Space className="email-group__content" direction="vertical">
              <span className="email-group__content--title">Email</span>
              <span className="email-group__content--mail">
                {profile?.email}
              </span>
            </Space>
          </Space>

          <Space className="email-group">
            <Space className="email-group__icon">
              <RiGenderlessLine style={{ fontSize: "20px", color: "#000" }} />
            </Space>
            <Space className="email-group__content" direction="vertical">
              <span className="email-group__content--title">Gender</span>
              <span className="email-group__content--mail">
                {capitalizeFirstLetter(profile?.gender.toLocaleLowerCase())}
              </span>
            </Space>
          </Space>
          <Space className="email-group">
            <Space className="email-group__icon">
              <LockOutlined style={{ fontSize: "20px", color: "#000" }} />
            </Space>
            <Space
              className="email-group__content"
              direction="vertical"
              onClick={() => showModal("password")}
            >
              {/* <span className="email-group__content--title">Email</span> */}
              <span className="email-group__password email-group__content--mail">
                Change Password
              </span>
            </Space>
          </Space>
        </div>
      </Space>
    </Space>
  );
};

export default Profile;
