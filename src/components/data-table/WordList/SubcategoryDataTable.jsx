import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Table } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";
import "./WordListDataTable.scss";
const SubcategoryDataTable = ({
  dataSource,
  onCLickItem,
  loading,
  handleEdit,
  handleDelete,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);
  const [editingRow, setEditingRow] = useState(null);
  const [edittingValues, setEditingValues] = useState("");

  useEffect(() => {
    const newData = dataSource.map((item) => {
      return {
        ...item,
        key: item.subcategoryId,
      };
    });
    setData(newData);
  }, [dataSource]);

  const onSave = () => {
    const params = {
      SubId: editingRow,
      title: edittingValues,
    };
    handleEdit(params);
    setEditingRow(null);
  };

  const onDelete = (record) => {
    const param = { SubId: [record.key] };
    handleDelete(param);
  };

  const cancel = () => {
    setEditingRow(null);
    setEditingValues("");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "word_cell",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend"],
      width: "50%",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="title"
              initialValue={record.values}
              rules={[
                {
                  required: true,
                  message: "Please enter your title",
                },
              ]}
            >
              <Input onChange={(e) => setEditingValues(e.target.value)} />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Amount of words",
      dataIndex: "amountOfWord",
      key: "amountOfWord",
      className: "word_cell",
      align: "center",
      width: "20%",
      sorter: (a, b) => {
        if (a.amountOfWord === 0) {
          return -1;
        } else if (b.amountOfWord === 0) {
          return 1;
        } else {
          return a.amountOfWord - b.amountOfWord;
        }
      },
    },
    {
      title: "Action",
      key: "function",
      dataIndex: "function",
      align: "center",
      className: "function-box",
      onCell: () => {
        return {
          onClick: (e) => {
            e.stopPropagation();
          },
        };
      },
      render: (_, record) => (
        <>
          {editingRow !== record.key ? (
            <Space size={"middle"}>
              <EditTwoTone
                className="function-box__edit"
                onClick={() => {
                  setEditingRow(record.subcategoryId);
                  setEditingValues(record.title.value);
                  form.setFieldsValue({
                    title: record.title,
                  });
                }}
              />
              <DeleteTwoTone
                twoToneColor="#EB1B36"
                className="function-box__delete"
                onClick={() => onDelete(record)}
              />
            </Space>
          ) : (
            <Space size={"middle"}>
              <Button onClick={onSave} style={{ marginRight: "40px" }}>
                Save
              </Button>
              <Button onClick={cancel}>Cancel</Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  const onFinish = (values) => {
    const updatedDataSource = [...data];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setData(updatedDataSource);
    setEditingRow(null);
  };

  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        if (editingRow !== record.key) {
          onCLickItem(record);
        }
      },
    };
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        onRow={setOnRowProps}
        pagination={{
          onChange: cancel,
        }}
        rowClassName={"subcategoryRow"}
      />
    </Form>
  );
};

export default SubcategoryDataTable;
