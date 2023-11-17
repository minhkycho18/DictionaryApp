import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { Modal } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const EditWordListModal = ({ type, editModalInfo, handleEditWordList }) => {
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

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
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
        open={isModalOpen}
        onOk={handleOk}
        onReset={onReset}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="edit-wordlist-form"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="title"
            label="Title"
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
