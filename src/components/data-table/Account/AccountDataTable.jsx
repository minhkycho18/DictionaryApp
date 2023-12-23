import { Modal, Table, Tag } from "antd";
import { upperFirst } from "lodash";
import "./AccountDataTable.scss";
import { colorGender, colorRole } from "../../../helpers/accountColor";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useState } from "react";

const AccountDataTable = ({ dataSource, handleChangeStatusAccount }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "word_cell",
      align: "center",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "20%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      width: "10%",
      render: (text) => (
        <Tag
          color={colorGender.get(text)}
          key={text}
          style={{
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {!text && "--"}
          {upperFirst(text)}
        </Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (role) => (
        <Tag
          color={colorRole.get(role.name)}
          key={role}
          style={{
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {role.name}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "lock",
      key: "lock",
      align: "center",
      render: (text, record) =>
        text ? (
          <LockOutlined
            style={{ fontSize: "20px", color: "red" }}
            onClick={() => {
              handleShowModal();
              setTitleContent("unlock");
              setCurrentRecord(record);
            }}
          />
        ) : (
          <UnlockOutlined
            style={{ fontSize: "20px", color: "green" }}
            onClick={() => {
              handleShowModal();
              setTitleContent("lock");
              setCurrentRecord(record);
            }}
          />
        ),
    },
    {
      title: "Participate in",
      dataIndex: "createdAt",
      key: "createdAt",
      className: "word_cell",
      align: "center",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleContent, setTitleContent] = useState("");
  const [currentRecord, setCurrentRecord] = useState({});

  const handleShowModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const param = {
      id: currentRecord.userId,
      action: titleContent,
    };
    handleChangeStatusAccount(param);
    setIsModalOpen(false);
  };
  return (
    <>
      <Table
        columns={columns}
        size="small"
        dataSource={dataSource.map((item) => {
          return { ...item, key: item.userId };
        })}
        style={{
          marginBottom: "10px",
        }}
      />
      <Modal
        open={isModalOpen}
        centered
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <p className="custom-modal-title">
            Do you want to{" "}
            <span
              className={
                titleContent === "lock"
                  ? `custom-modal-title-lock`
                  : `custom-modal-title-unlock`
              }
            >
              {titleContent}
            </span>{" "}
            this account ?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default AccountDataTable;
