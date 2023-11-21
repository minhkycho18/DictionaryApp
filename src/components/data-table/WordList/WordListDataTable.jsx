import { Space, Table } from "antd";
import React, { useState } from "react";
import "./WordListDataTable.scss";
import { DeleteTwoTone } from "@ant-design/icons";
import EditWordListModal from "../../../pages/Manager/WordList/CustomModals/EditWordListModal";

const WordListDataTable = ({
  dataSource,
  loading,
  handleTableChange,
  onCLickItem,
  handleEdit,
  handleDelete,
}) => {
  const [selectedWordlist, setSelectedWordlist] = useState(null);

  const onClickDelete = () => {
    handleDelete(selectedWordlist.id);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "word_cell",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend"],
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "listDesc",
      key: "listDesc",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
      align: "center",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      sorter: (a, b) => a.createdAt - b.createdAt,
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
          <EditWordListModal
            editModalInfo={selectedWordlist}
            handleEditWordList={handleEdit}
          />
          <DeleteTwoTone
            twoToneColor="#EB1B36"
            className="function-box__delete"
            onClick={onClickDelete}
          />
        </Space>
      ),
    },
  ];

  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        onCLickItem(record);
      },
      onMouseOver: () => {
        setSelectedWordlist(record);
      },
    };
  };

  return (
    <Table
      loading={loading}
      bordered
      columns={columns}
      size={"small"}
      dataSource={dataSource}
      onChange={handleTableChange}
      onRow={setOnRowProps}
    />
  );
};

export default WordListDataTable;
