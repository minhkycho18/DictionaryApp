import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  notification,
} from "antd";
import { useState } from "react";

const AddAccountModal = ({ handleRegister }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleShowModal = () => {
    setIsModalOpen(!isModalOpen);
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleRegister(values);
      handleShowModal();
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Please fill in required field",
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Add new account</Button>
      <Modal
        title="Register new account"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        footer={[
          <Button key="reset" onClick={onReset}>
            Reset
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Register
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="registration-form"
          //   onFinish={onFinish}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
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
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="name"
            label="Nickname"
            rules={[
              {
                required: true,
                message: "Please enter your nickname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <Select placeholder="Select a gender">
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                  <Option value="OTHER">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={4}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "Please select your role!",
                  },
                ]}
              >
                <Select placeholder="Select a role">
                  <Option value="ADMIN">Admin</Option>
                  <Option value="CONTENT_MANAGER">Content manager</Option>
                  <Option value="LEARNER">Learner</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddAccountModal;
