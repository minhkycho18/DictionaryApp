import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { Modal } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const EditWordListModal = ({ editModalInfo, handleEditWordList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editModalInfo) {
      form.setFieldsValue({
        title: editModalInfo.title,
        listDesc: editModalInfo.listDesc,
      });
    }
  }, [editModalInfo]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values = {
        id: editModalInfo.id,
        ...values,
        listType: "PUBLIC",
      };
      form.resetFields();
      setIsModalOpen(false);
      handleEditWordList(values);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <EditTwoTone className="function-box__edit" onClick={showModal} />
      <Modal
        title="Edit WordList"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onReset={onReset}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit-wordlist-form"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            style={{
              marginTop: "20px",
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="listDesc"
            label="Description"
            style={{
              marginTop: "20px",
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditWordListModal;
