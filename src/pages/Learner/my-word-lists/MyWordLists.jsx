import { PlusOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Radio, Row, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ListItem from "../../../components/my-word-lists/ListItem";
import {
  createNewWL,
  deleteExistWordList,
  getAllWL,
} from "../../../stores/word-lists/wordLists-thunk";
import "./MyWordLists.scss";
const MyWordLists = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loading, wordLists } = useSelector((state) => state.wordLists);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllWL());
  }, [dispatch]);

  const handleSelectWordList = (wordlist) => {
    navigate(`/dashboard/wordLists/${wordlist?.title}/${wordlist?.id}`);
  };
  const onDeleteAnItem = (id) => {
    dispatch(deleteExistWordList(id));
  };

  const handleAddingWordList = () => {
    setOpen(!open);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Space
      className={`MyWordLists ${loading ? "loading-css" : ""}`}
      style={{ width: "100%!important" }}
    >
      <Modal
        open={open}
        title="Create a new WordList"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              setTimeout(() => {
                dispatch(createNewWL(values));
                form.resetFields();
                setOpen(false);
                setConfirmLoading(false);
              }, 1000);
            })
            .catch((info) => {});
        }}
        confirmLoading={confirmLoading}
        style={{ width: "289px!important", height: "289px!important" }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
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
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input the description!",
              },
            ]}
            name="listDesc"
            label="Description"
          >
            <TextArea autoSize></TextArea>
          </Form.Item>
          <Form.Item
            name="listType"
            className="collection-create-form_last-form-item"
            rules={[
              {
                required: true,
                message: "Please select a type for your list!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="PUBLIC">Public</Radio>
              <Radio value="PRIVATE">Private</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
      {!loading && (
        <Row gutter={[8, 8]}>
          <Col>
            <Space
              className="
      MyWordLists__add"
              onClick={handleAddingWordList}
            >
              <PlusOutlined />
            </Space>
          </Col>

          {wordLists &&
            wordLists.map((wordlist, index) => (
              <Col key={wordlist.id + index}>
                <ListItem
                  key={wordlist.id}
                  wordlist={wordlist}
                  onSelect={handleSelectWordList}
                  onDel={onDeleteAnItem}
                />
              </Col>
            ))}
        </Row>
      )}
      {loading && <Spin spinning={loading} />}
    </Space>
  );
};

export default MyWordLists;
