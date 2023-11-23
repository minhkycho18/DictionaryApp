import { Space, Table, Tag } from "antd";
import React from "react";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import colorPos from "../../helpers/ColorPos";
import { upperFirst } from "lodash/string";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import "./VocabularyDataTable.scss";
const VocabularyDataTable = ({
  loading,
  pagination,
  dataSource,
  onTableChange,
  onClickItem,
  isEditable,
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
      onCell: () => {
        return {
          onClick: (e) => {
            e.stopPropagation();
          },
        };
      },
      render: () => (
        <Space size={"middle"}>
          {isEditable && <EditTwoTone className="function-box__edit" />}
          <DeleteTwoTone
            twoToneColor="#EB1B36"
            className="function-box__delete"
          />
        </Space>
      ),
    },
  ];

  const handleTableChange = (paginationParam) => {
    console.log(paginationParam);
    onTableChange((paginationParam.current - 1) * 10);
  };

  const setOnRowProps = (record) => {
    return {
      onClick: () => {
        onClickItem(record);
      },
    };
  };

  return (
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
  );
};

export default VocabularyDataTable;
