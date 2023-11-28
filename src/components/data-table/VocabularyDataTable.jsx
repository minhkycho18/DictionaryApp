import { Button, Modal, notification, Space, Table, Tag } from "antd";
import { useState } from "react";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import colorPos from "../../helpers/ColorPos";
import { upperFirst } from "lodash/string";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "./VocabularyDataTable.scss";
import EditDefaultVocabularyModal from "../Modal/EditDefaultVocabularyModal";
import { deleteDefaultVocab } from "../../api/Vocabulary/vocabulary.api";

const VocabularyDataTable = ({
  loading,
  currentPage,
  pagination,
  dataSource,
  editable,
  onTableChange,
  onClickItem,
  onDeleteVocabInSub,
}) => {
  const columns = [
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      className: "word_cell",
    },
    {
      title: "Part of speech",
      dataIndex: "pos",
      key: "pos",
      align: "center",
      render: (text) => (
        <Tag color={colorPos.get(text)} key={text} style={{ fontSize: "15px" }}>
          {upperFirst(text)}
        </Tag>
      ),
    },
    {
      title: "Phonetic US",
      dataIndex: "phoneUs",
      key: "phoneUs",
      align: "center",
      render: (text) => (
        <>
          {!text && "--"}
          {text}
        </>
      ),
    },
    {
      title: "Phonetic UK",
      key: "phoneUk",
      dataIndex: "phoneUk",
      align: "center",
      render: (text) => (
        <>
          {!text && "--"}
          {text}
        </>
      ),
    },
    {
      title: "Audio US",
      key: "audioUs",
      dataIndex: "audioUs",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation();
            const audioUs = record.audioUs;
            if (audioUs) {
              new Audio(audioUs).play();
            }
          },
        };
      },
      render: (text) => (
        <div>
          {text && <BiSolidVolumeFull size={18} />}
          {!text && <BiSolidVolumeMute size={18} style={{ opacity: 0.5 }} />}
        </div>
      ),
    },
    {
      title: "Audio UK",
      key: "audioUk",
      dataIndex: "audioUk",
      align: "center",
      onCell: (record) => {
        return {
          onClick: (e) => {
            e.stopPropagation();
            const audioUk = record.audioUk;
            if (audioUk) {
              new Audio(audioUk).play();
            }
          },
        };
      },
      render: (text) => (
        <div>
          {text && <BiSolidVolumeFull size={18} />}
          {!text && <BiSolidVolumeMute size={18} style={{ opacity: 0.5 }} />}
        </div>
      ),
    },
    {
      title: "",
      key: "function",
      dataIndex: "function",
      align: "center",
      className: "function-box",
      onCell: (record) => {
        return {
          onClick: (e) => {
            setCurrentVocab(record);
            e.stopPropagation();
          },
        };
      },
      render: () => (
        <Space size={"middle"}>
          {editable && (
            <EditTwoTone className="function-box__edit" onClick={handleShow} />
          )}
          <DeleteTwoTone
            twoToneColor="#EB1B36"
            className="function-box__delete"
            onClick={handleShowDeleteModal}
          />
        </Space>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentVocab, setCurrentVocab] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, func) => {
    let message;
    switch (type) {
      case "success":
        message =
          func === "delete"
            ? `Delete default vocabulary successfully`
            : `Edit default vocabulary successfully`;
        break;
      case "error":
        message =
          func === "delete"
            ? "Can't delete this vocabulary"
            : "Can't edit this vocabulary";
        break;
      default:
        break;
    }
    api[type]({
      message: message,
    });
  };
  const handleShow = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleShowDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  //Delete
  const handleDeleteVocab = async () => {
    try {
      if (editable) {
        await deleteDefaultVocab(currentVocab.id);
      } else {
        const param = {
          currentPage: (pagination.current - 1) * 10,
          data: [
            {
              vocabId: currentVocab.vocabId,
              defId: currentVocab.definition.defId,
            },
          ],
        };
        onDeleteVocabInSub(param);
      }
      onTableChange((currentPage - 1) * 10);
      openNotificationWithIcon("success", "delete");
    } catch (e) {
      openNotificationWithIcon("error", "delete");
    }
    handleShowDeleteModal();
  };

  const handleTableChange = (paginationParam) => {
    onTableChange((paginationParam.current - 1) * 10);
  };

  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        onClickItem(record);
      },
    };
  };

  const handleEditSubmitForm = () => {
    onTableChange((currentPage - 1) * 10);
  };
  return (
    <>
      {contextHolder}
      <Table
        loading={loading}
        bordered
        columns={columns}
        pagination={pagination}
        size={"small"}
        dataSource={dataSource}
        onChange={handleTableChange}
        onRow={setOnRowProps}
      />

      {isModalOpen && (
        <EditDefaultVocabularyModal
          vocabDetail={currentVocab}
          isOpen={isModalOpen}
          handleShow={handleShow}
          handleEditForm={handleEditSubmitForm}
          notification={openNotificationWithIcon}
        />
      )}
      <Modal
        centered
        title="Are you sure you want to delete this vocabulary?"
        open={isDeleteModalOpen}
        onOk={handleDeleteVocab}
        onCancel={handleShowDeleteModal}
        footer={[
          <Button key="back" onClick={handleShowDeleteModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            danger
            onClick={handleDeleteVocab}
          >
            Delete
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default VocabularyDataTable;
