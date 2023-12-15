import { Spin, Table, Tag } from "antd";
import { upperFirst } from "lodash";
import colorStatus from "../../../helpers/ColorStatus";
import { useEffect, useState } from "react";
import { getAllHistory } from "../../../api/Vocabulary/vocabulary.api";
import VocabularyDetailModal from "../../Modal/VocabularyDetailModal";

const HistoryDataTable = () => {
  const columns = [
    {
      title: "Word",
      dataIndex: "vocabulary",
      key: "word",
      className: "word_cell",
      render: (vocabulary) => {
        return vocabulary.word;
      },
    },
    {
      title: "Status",
      dataIndex: "statusOfReview",
      key: "statusOfReview",
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
      dataIndex: "vocabulary",
      key: "contributedBy",
      align: "center",
      render: (vocabulary) => {
        return vocabulary.contributedBy;
      },
    },
    {
      title: "Contributed at",
      dataIndex: "vocabulary",
      key: "contributedAt",
      align: "center",
      // sorter: (a, b) => a.contributedAt - b.contributedAt,
      sortDirections: ["descend"],
      render: (vocabulary) => {
        return vocabulary.contributedAt;
      },
    },
    {
      title: "Confirmed by",
      dataIndex: "confirmedBy",
      key: "confirmedBy",
      align: "center",
    },
    {
      title: "Confirmed at",
      dataIndex: "confirmedAt",
      key: "confirmedAt",
      align: "center",
      // sorter: (a, b) => a.contributedAt - b.contributedAt,
      sortDirections: ["descend"],
    },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVocab, setCurrentVocab] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllHistory();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleOpenDetail = (item) => {
    console.log(item);
  };

  const handleShow = () => {
    setIsModalOpen(!isModalOpen);
  };

  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        setIsModalOpen(true);
        setCurrentVocab(record);
        handleOpenDetail(record);
      },
    };
  };
  return (
    <div style={{ position: "relative" }}>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        onRow={setOnRowProps}
      />

      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <Spin size="large" tip="Loading..." />
        </div>
      )}
      {isModalOpen && (
        <VocabularyDetailModal
          vocabDetail={currentVocab.vocabulary}
          isOpen={isModalOpen}
          handleShow={handleShow}
        />
      )}
    </div>
  );
};

export default HistoryDataTable;
