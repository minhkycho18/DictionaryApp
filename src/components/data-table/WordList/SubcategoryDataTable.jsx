import React from "react";
import { Space, Table } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { DeleteTwoTone } from "@ant-design/icons";
const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    className: "word_cell",
    align: "center",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ["descend"],
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
    render: () => (
      <Space size={"middle"}>
        <EditTwoTone className="function-box__edit" />
        <DeleteTwoTone
          twoToneColor="#EB1B36"
          className="function-box__delete"
        />
      </Space>
    ),
  },
];
const SubcategoryDataTable = ({ dataSource, onCLickItem, loading }) => {
  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        onCLickItem(record);
      },
    };
  };
  return (
    <Table
      loading={loading}
      bordered
      columns={columns}
      //   pagination={pagination}
      size={"small"}
      dataSource={dataSource}
      //   onChange={handleTableChange}
      onRow={setOnRowProps}
    />
  );
};

export default SubcategoryDataTable;
