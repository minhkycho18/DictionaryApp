import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Spin,
  Tabs,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Subcategory from "../../../components/Category/Subcategory";
import { capitalizeFirstLetter } from "../../../helpers/changeTitle";
import {
  createSubcategory,
  getSubcategory,
} from "../../../stores/subcategory/subcategoryThunk";
import "./WordListsPage.scss";
import { PlusOutlined } from "@ant-design/icons";

function WordListsPage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, error, subcategories } = useSelector(
    (state) => state.subcategory
  );
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getSubcategory(id));
  }, [dispatch, id]);

  const renderSub = subcategories.map((subcategory, index) => {
    return {
      key: index,
      label: capitalizeFirstLetter(subcategory?.title),
      children: (
        <Subcategory
          key={subcategory.subcategoryId}
          subcategory={subcategory}
        />
      ),
    };
  });

  const errorOpen = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  const showAddMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Space
      className={`wordlist__page ${loading ? "loading-css" : ""}`}
      direction="vertical"
    >
      <Modal
        open={isOpen}
        title="Add new subcategories"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              setTimeout(() => {
                dispatch(createSubcategory({ wordListId: +id, ...values }));
                console.log({ wordListId: id, ...values });
                messageApi.success("Success!");
                form.resetFields();
                setIsOpen(false);
                setConfirmLoading(false);
              }, 1000);
            })
            .catch((info) => {
              messageApi.error("Fail!");
            });
        }}
        confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          layout="vertical"
          name="formAddSub"
          initialValues={{
            modifier: "public",
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
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subcategoryType"
            className="collection-create-form_last-form-item"
            rules={[
              {
                required: true,
                message: "Please select a type for your list!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="DEFAULT">Default</Radio>
              <Radio value="PUBLIC">Public</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
      {error !== null && errorOpen()}
      {!loading && subcategories.length > 1 && (
        <Tabs
          // type="card"
          // type="editable-card"
          tabBarExtraContent={{
            left: (
              <Button onClick={showAddMenu}>
                <PlusOutlined />
                <span>Add new</span>
              </Button>
            ),
          }}
          hideAdd
          tabBarStyle={{
            fontSize: 14,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 500,
            color: "#07285a",
          }}
          defaultActiveKey="0"
          items={renderSub}
          tabPosition="right"
          // onChange={onChange}
        />
      )}
      {loading && <Spin spinning={loading} />}
    </Space>
  );
}

export default WordListsPage;
