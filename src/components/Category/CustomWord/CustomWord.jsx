import {
  CloseOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { upperFirst } from "lodash";
import React, { useEffect, useState } from "react";
import { getAllPos } from "../../../api/Vocabulary/vocabulary.api";
import "./CustomWord.scss";
import getAudioUpload from "../../../helpers/uploadCloudinary";

const CustomWord = (props) => {
  const [pos, setPos] = useState([]);
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const [definition] = useState([
    {
      wordDesc: "",
      example: "",
    },
  ]);

  useEffect(() => {
    const _getAllPos = async () => {
      const result = await getAllPos();
      setPos(result);
    };
    _getAllPos();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      definition,
    });
  }, [form, definition]);

  const onSubmit = async (values) => {
    const audioUs = await getAudioUpload(values?.audioUs?.file);
    const audioUk = await getAudioUpload(values?.audioUk?.file);
    const data = {
      ...values,
      audioUs: audioUs,
      audioUk: audioUk,
      wordType: "CUSTOM",
    };
    const params = {
      ...props.subInfo,
      data: data,
    };
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Would you like to contribute this vocabulary?",
      okText: "Ok",
      cancelText: "No",
      onOk: props.handleAddCustomVocab(params),
      onCancel: props.handleAddCustomVocab(params),
    });
    // props.handleAddCustomVocab(params);
    form.resetFields();
    form.setFieldsValue({
      definition,
    });
  };

  const propsUpload = {
    action: "https://run.mocky.io/v3/183997c2-99cf-4351-9bcd-ee5d7d34fe0c",
    maxCount: 1,
    accept: "audio/* ",
    onChange({ file, fileList }) {
      if (file.status === "error") {
        return { ...file, status: "error" };
      }

      if (file.status === "removed") {
        return undefined;
      }
      if (file.status === "done") {
        return { ...file, status: "done" };
      }
      return file;
    },
    beforeUpload: (file) => {
      const isAudio = file.type.startWith("audio/");
      if (!isAudio) {
        message.error("Not a audio file!");
      }
      return isAudio || Upload.LIST_IGNORE;
    },
  };

  return (
    <Space className="custom-word__wrap">
      <Form
        name="custom_word"
        layout="vertical"
        onFinish={onSubmit}
        style={{
          width: "100%",
        }}
        form={form}
        className="custom-word__form"
      >
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              name="word"
              label="Input Word"
              rules={[
                {
                  required: true,
                  message: "Please input your word!",
                },
              ]}
              required
            >
              <Input type="text" placeholder="Enter word here..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="pos"
              label="Part of speech"
              placeholder="Part of speech"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select>
                {pos &&
                  pos.map((item) => (
                    <Select.Option key={item} value={item}>
                      {upperFirst(item)}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Space style={{ width: "100%" }}>
          <Form.Item name="phoneUs" label="Phone US">
            <Input type="text" placeholder="Write here" />
          </Form.Item>
          <Form.Item
            name="audioUs"
            label="Audio Us"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Upload
              {...propsUpload}
              className="form__upload"
              onRemove={() => form.setFieldsValue({ audioUs: undefined })}
            >
              <Button className="form__upload__btn" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Space>
        <Space style={{ width: "100%" }}>
          <Form.Item name="phoneUk" label="Phone UK">
            <Input type="text" placeholder="Write here" />
          </Form.Item>
          <Form.Item
            name="audioUk"
            label="Audio Uk"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Upload
              {...propsUpload}
              className="form__upload"
              onRemove={() => form.setFieldsValue({ audioUk: undefined })}
            >
              <Button className="form__upload__btn" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Space>

        <Form.List name="definition">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                rowGap: 16,
                flexDirection: "column",
              }}
            >
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Card
                  size="small"
                  title={`Definition ${name + 1}`}
                  key={key}
                  extra={
                    fields.length > 1 && (
                      <CloseOutlined
                        onClick={() => {
                          remove(name);
                        }}
                      ></CloseOutlined>
                    )
                  }
                >
                  <Form.Item
                    {...restField}
                    name={[name, "wordDesc"]}
                    label="Definition"
                    rules={[
                      {
                        required: true,
                        message: "Please input your definition!",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Write here..." />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "example"]}
                    label="Example"
                    rules={[
                      {
                        required: true,
                        message: "Please input your example!",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Write here..." />
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add definition
              </Button>
            </div>
          )}
        </Form.List>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </Space>
  );
};

export default CustomWord;
