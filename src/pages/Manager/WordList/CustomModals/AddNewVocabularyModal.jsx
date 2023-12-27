import { Button, Modal } from "antd";
import { useState } from "react";
import DefaultWord from "../../../../components/Category/DefaultWord/DefaultWord";

const AddNewVocabularyModal = ({ vocabInSub, onAddVocab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputWordDefault, setInputWordDefault] = useState("");
  const showModal = () => {
    setInputWordDefault("");
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setInputWordDefault("");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setInputWordDefault("");
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>Add a new Vocabulary</Button>
      <Modal
        title="Add to your subcategory"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DefaultWord
          vocabInSub={vocabInSub}
          onAddVocab={onAddVocab}
          inputWordDefault={inputWordDefault}
          setInputWordDefault={setInputWordDefault}
        />
      </Modal>
    </>
  );
};

export default AddNewVocabularyModal;
