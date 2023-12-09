import { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
const WORDLIST_DATA_TYPE = "wordlist";
const SUBCATEGORY_DATA_TYPE = "subcategory";
const AddModal = ({ type, handleCreateNew }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (form) {
      form.getFieldInstance("title");
    }
  }, [form]);

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

  const handleEnterPress = () => {
    if (type === SUBCATEGORY_DATA_TYPE) {
      handleOk();
    } else {
      form.getFieldInstance("listDesc").focus();
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>
        {`Add a new${type === WORDLIST_DATA_TYPE ? " WordList" : ""}${
          type === SUBCATEGORY_DATA_TYPE ? " Subcategory" : ""
        }`}
      </Button>
      <Modal
        title="Add a new "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
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
          form={form}
          layout="vertical"
          name="add-wordlist-form"
          onFinish={onFinish}
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
              marginTop: "20px",
            }}
          >
            <Input onPressEnter={handleEnterPress} />
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
              style={{
                marginTop: "20px",
              }}
            >
              <Input onPressEnter={handleOk} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default AddModal;
