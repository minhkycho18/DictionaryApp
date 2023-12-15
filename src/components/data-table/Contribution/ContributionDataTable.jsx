import { Modal, Table, Tag, notification } from "antd";
import colorPos from "../../../helpers/ColorPos";
import { upperFirst } from "lodash";
import { useState, useEffect } from "react";
import colorStatus from "../../../helpers/ColorStatus";
import EditDefaultVocabularyModal from "../../Modal/EditDefaultVocabularyModal";
import { reviewDefaultVocab } from "../../../api/Vocabulary/vocabulary.api";

const ContributionDataTable = ({
  dataSource,
  handleAprroveVocab,
  handleRejectVocab,
  onTableChange,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState(dataSource);
  const [currentVocab, setCurrentVocab] = useState({});
  const [api, contextHolder] = notification.useNotification();

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
          {!text && "--"}
          {upperFirst(text)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "10%",
      render: (text) => (
        <Tag
          color={colorStatus.get(text)}
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
      title: "Contributed by",
      dataIndex: "contributedBy",
      key: "contributedBy",
      align: "center",
    },
    {
      title: "Contributed at",
      dataIndex: "contributedAt",
      key: "contributedAt",
      align: "center",
      sorter: (a, b) => a.contributedAt - b.contributedAt,
      sortDirections: ["descend"],
    },
  ];

  useEffect(() => {
    const newData = dataSource.map((item) => {
      return {
        ...item,
        key: item.id,
      };
    });
    setData(newData);
  }, [dataSource]);

  const openNotificationWithIcon = (type, func) => {
    let message;
    switch (type) {
      case "success":
        message =
          func === "contribute"
            ? `Approved this vocabulary successfully`
            : `Rejected this vocabulary successfully`;
        break;
      case "error":
        message =
          func === "contribute"
            ? "Can't make change this vocabulary"
            : "Can't make change vocabulary";
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

  const handleApprove = () => {
    handleAprroveVocab(currentVocab);
  };

  const handleTableChange = () => {
    onTableChange(currentVocab);
  };

  const handleShowSubmitModal = () => {
    setIsSubmit(!isSubmit);
  };

  const onSubmitModal = async () => {
    const data = {
      ...currentVocab,
      status: "REJECTED",
    };
    await reviewDefaultVocab(currentVocab.id, data);
    handleShow();
    handleRejectVocab(currentVocab);
    handleShowSubmitModal();
    openNotificationWithIcon("success", "edit");
  };

  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        setIsModalOpen(true);
        setCurrentVocab(record);
      },
    };
  };
  return (
    <>
      {contextHolder}
      <Table
        bordered
        loading={loading}
        columns={columns}
        size={"small"}
        dataSource={data}
        onChange={handleTableChange}
        onRow={setOnRowProps}
        style={{
          marginBottom: "10px",
        }}
      ></Table>
      {isModalOpen && (
        <>
          <EditDefaultVocabularyModal
            vocabDetail={currentVocab}
            isOpen={isModalOpen}
            handleShow={handleShow}
            contribution={true}
            handleEditForm={handleApprove}
            handleRejectVocab={handleShowSubmitModal}
            notification={openNotificationWithIcon}
          />
          {isSubmit && (
            <Modal
              centered
              title={
                <div style={{ marginTop: "20px" }}>
                  If you reject, these information will not be changed. Do you
                  want to reject this vocabulary?
                </div>
              }
              open={isSubmit}
              onOk={onSubmitModal}
              onCancel={handleShowSubmitModal}
            ></Modal>
          )}
        </>
      )}
    </>
  );
};

export default ContributionDataTable;
