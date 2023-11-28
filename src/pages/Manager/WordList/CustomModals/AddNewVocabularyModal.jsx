import { Button, Modal } from "antd";
import React, { useState } from "react";
import DefaultWord from "../../../../components/Category/DefaultWord/DefaultWord";

const AddNewVocabularyModal = ({ vocabInSub, onAddVocab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add a new Vocabulary
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DefaultWord vocabInSub={vocabInSub} onAddVocab={onAddVocab} />
      </Modal>
    </>
  );
};

export default AddNewVocabularyModal;
