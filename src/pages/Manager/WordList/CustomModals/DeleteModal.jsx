import { Button, Modal, notification } from "antd";
import React from "react";
import { useState } from "react";

const DeleteModal = ({ isOpen, handleDelete, handleShow, title }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(isOpen);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, func) => {
    let message;
    switch (type) {
      case "success":
        message = `Delete ${title} successfully`;
        break;
      case "error":
        message = message = `Can't delete ${title}`;
        break;
      default:
        break;
    }
    api[type]({
      message: message,
    });
  };

  const handleShowDeleteModal = () => {
    handleShow();
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteItem = async () => {
    try {
      handleDelete();
      openNotificationWithIcon("success", "delete");
    } catch (e) {
      openNotificationWithIcon("error", "delete");
    }
    handleShowDeleteModal();
  };
  return (
    <>
      {contextHolder}
      <Modal
        centered
        title={`Are you sure you want to delete ${title}?`}
        open={isOpen}
        onOk={handleDeleteItem}
        onCancel={handleShowDeleteModal}
        footer={[
          <Button key="back" onClick={handleShowDeleteModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleDeleteItem}>
            Delete
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default DeleteModal;
