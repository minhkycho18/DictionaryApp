import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import "./WordListDataTable.scss";
import { DeleteTwoTone } from "@ant-design/icons";
import EditWordListModal from "../../../pages/Manager/WordList/CustomModals/EditWordListModal";

const WordListDataTable = ({
  dataSource,
  loading,
  handleTableChange,
  onCLickItem,
  handleEditWordList,
  handleDeleteWordList,
}) => {
  const [selectedWordlist, setSelectedWordlist] = useState(null);

  const onClickDelete = () => {
    handleDeleteWordList(selectedWordlist.id);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "word_cell",
      align: "center",
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
            handleEditWordList={handleEditWordList}
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        // editing: isEditing(record),
      }),
    };
  });
  return (
    <Table
      loading={loading}
      bordered
      columns={mergedColumns}
      //   pagination={pagination}
      size={"small"}
      dataSource={dataSource}
      onChange={handleTableChange}
      onRow={setOnRowProps}
    />
  );
};

export default WordListDataTable;
