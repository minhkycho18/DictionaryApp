import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
const WORDLIST_DATA_TYPE = "wordlist";
const SUBCATEGORY_DATA_TYPE = "subcategory";
const VOCABULARY_DATA_TYPE = "vocabulary";
const AddModal = ({ type, handleCreateNew }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 6,
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
      if (type === WORDLIST_DATA_TYPE) {
        values = {
          ...values,
          listType: "PUBLIC",
        };
      }
      form.resetFields();
      setIsModalOpen(false);
      handleCreateNew(values);
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
      <Button type="primary" onClick={showModal}>
        {`Add a new${type === WORDLIST_DATA_TYPE ? " WordList" : ""}${
          type === SUBCATEGORY_DATA_TYPE ? " Subcategory" : ""
        }`}
      </Button>
      <Modal
        title="Add a new WordList"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="reset" onClick={onReset}>
            Reset
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form
          {...layout}
          form={form}
          name="add-wordlist-form"
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
                message: "Please input the title!",
              },
            ]}
            style={{
              marginTop: "40px",
            }}
          >
            <Input />
          </Form.Item>
          {type === WORDLIST_DATA_TYPE && (
            <Form.Item
              name="listDesc"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input the description!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
