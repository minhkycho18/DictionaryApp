import { Table, Tag, notification } from "antd";
import colorPos from "../../../helpers/ColorPos";
import { upperFirst } from "lodash";
import { useState } from "react";
import colorStatus from "../../../helpers/ColorStatus";
import EditDefaultVocabularyModal from "../../Modal/EditDefaultVocabularyModal";

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

const ContributionDataTable = ({
  dataSource,
  handleAprroveVocab,
  onTableChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVocab, setCurrentVocab] = useState({});
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

  const handleApproveAndReject = () => {
    handleAprroveVocab(currentVocab);
  };

  const handleTableChange = () => {
    onTableChange(currentVocab);
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
        // loading={loading}
        bordered
        columns={columns}
        size={"small"}
        dataSource={dataSource}
        onChange={handleTableChange}
        onRow={setOnRowProps}
      ></Table>
      {isModalOpen && (
        <EditDefaultVocabularyModal
          vocabDetail={currentVocab}
          isOpen={isModalOpen}
          handleShow={handleShow}
          contribution={true}
          handleEditForm={handleApproveAndReject}
          notification={openNotificationWithIcon}
        />
      )}
    </>
  );
};

export default ContributionDataTable;
