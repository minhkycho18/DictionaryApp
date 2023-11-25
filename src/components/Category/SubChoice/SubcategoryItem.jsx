import { CheckCircleFilled } from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import { getAllVocabInSub } from "../../../api/Subcategory/subcategory.api";

const SubcategoryItem = ({ sub, onHandleAdd, wordListId, selectedVocab }) => {
  const [vocabs, setVocabs] = useState();

  const _getAllVocab = async () => {
    try {
      const rs = await getAllVocabInSub({
        wordListId: wordListId,
        SubId: sub.subcategoryId,
      });
      setVocabs(rs);
    } catch (error) {}
  };
  const checkValid = () => {
    _getAllVocab();

    if (vocabs) {
      return vocabs?.content.some(
        (vocab) =>
          vocab.vocabId === selectedVocab.vocabId &&
          vocab.definition.defId === selectedVocab.defId
      );
    }
  };

  return (
    <Space
      className="item__category"
      onClick={() =>
        onHandleAdd({
          wordListId: wordListId,
          SubId: sub.subcategoryId,
        })
      }
    >
      <Space style={{ padding: "0px 16px" }}>{sub?.title}</Space>
      {checkValid() && (
        <CheckCircleFilled style={{ color: "green", fontSize: 20 }} />
      )}
      {/* {loading && <Loading3QuartersOutlined />} */}
    </Space>
  );
};

export default SubcategoryItem;
