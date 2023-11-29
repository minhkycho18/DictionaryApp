import { Space, Table } from "antd";
import { useState } from "react";
import "./WordListDataTable.scss";
import { DeleteTwoTone } from "@ant-design/icons";
import EditWordListModal from "../../../pages/Manager/WordList/CustomModals/EditWordListModal";
import DeleteModal from "../../../pages/Manager/WordList/CustomModals/DeleteModal";

const WordListDataTable = ({
  dataSource,
  loading,
  handleTableChange,
  onCLickItem,
  handleEdit,
  handleDelete,
}) => {
  const [selectedWordlist, setSelectedWordlist] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      className: "word_cell",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend"],
      ellipsis: true,
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "listDesc",
      key: "listDesc",
      ellipsis: true,
      width: "20%",
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
      title: "Modified by",
      dataIndex: "createdBy",
      key: "createdBy",
      align: "center",
    },
    {
      title: "Modified at",
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
      width: "10%",
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
            onClick={handleShowDeleteModal}
          />
        </Space>
      ),
    },
  ];

  const handleShowDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

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
    <>
      <Table
        loading={loading}
        columns={columns}
        size={"small"}
        dataSource={dataSource}
        onChange={handleTableChange}
        onRow={setOnRowProps}
      />
      <DeleteModal
        title={`"${selectedWordlist?.title}"`}
        isOpen={isDeleteModalOpen}
        handleDelete={() => handleDelete(selectedWordlist.id)}
        handleShow={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
      />
    </>
  );
};

export default WordListDataTable;
