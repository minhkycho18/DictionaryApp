import React, { useEffect, useState } from "react";
import "./LeitnerGame.scss";
import { getAllVocabInALevel } from "../../../api/Leitner/leitner.api";
import { useLoaderData } from "react-router-dom";
import {
  Button,
  Checkbox,
  Modal,
  Pagination,
  Select,
  Space,
  Tooltip,
} from "antd";
import { FaGraduationCap } from "react-icons/fa6";
import { DeleteOutlined } from "@ant-design/icons";
import { upperFirst } from "lodash";
const LeitnerLevel = (props) => {
  const loader = useLoaderData();
  const [vocabs, setVocabs] = useState();
  // const { id } = useParams();
  useEffect(() => {
    const _getAllVocab = async () => {
      const result = await getAllVocabInALevel(+loader.data.level);
      if (result) {
        setVocabs(result);
      }
    };
    _getAllVocab();
    return () => {};
  }, [loader.data.level]);
  console.log(vocabs);
  // const plainOptions = vocabsInSub;
  // const checkAll =
  //   plainOptions.length === selectedIds.length && plainOptions.length !== 0;
  // const indeterminate =
  //   selectedIds.length > 0 && selectedIds.length < plainOptions.length;
  // const filterVocab = vocabsInSub.filter((vocab) =>
  //   vocab.word.toLowerCase().startsWith(keyword.toLowerCase())
  // );
  // const itemsPerPage = 10;
  // const startIndex = (page - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const wordsToDisplay = filterVocab.slice(startIndex, endIndex);
  // const filterByPos =
  //   currentPos === "All"
  //     ? wordsToDisplay
  //     : wordsToDisplay.filter((vocab) =>
  //         vocab.pos.toLowerCase().startsWith(currentPos.toLowerCase())
  //       );
  // const renderVocabInSub = filterByPos.map((vocab, index) => (
  //   <SubcategoryItem
  //     key={index}
  //     vocab={vocab}
  //     setList={onChangeList}
  //     isChecked={selectedIds.some(
  //       (item) =>
  //         item.vocabId === vocab.vocabId &&
  //         item.defId === vocab.definition.defId
  //     )}
  //   />
  // ));
  return (
    <Space className="subcategory" direction="vertical">
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Button className="subcategory__study">
          <span style={{ marginRight: 8 }}>Study</span>
          <FaGraduationCap size={22} />
        </Button>
      </Space>

      <div className="subcategory__back" direction="vertical">
        {/* {contextHolder} */}

        <Space direction="vertical">
          <Space
            style={{
              marginTop: 8,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space>
              <Space className="delete-btn">
                <Checkbox
                  style={{
                    marginLeft: 12,
                  }}
                  // indeterminate={indeterminate}
                  // onClick={onCheckAllChange}
                  // checked={checkAll}
                ></Checkbox>
                <Tooltip title="Delete selected items" color={"danger"}>
                  <DeleteOutlined
                    className="delete-btn__icon"
                    // style={{
                    //   color: `${selectedIds.length > 0 ? "red" : "black"}`,
                    // }}
                  />
                </Tooltip>
              </Space>
              <Select
                bordered
                placeholder="Part of speech"
                style={{ width: 200 }}
                className="pos_filter-select"
                // options={allPos.map((item) => ({
                //   value: upperFirst(item),
                //   label: upperFirst(item),
                // }))}
                // defaultValue={"All"}
                // onChange={onChangePosFilter}
              />
            </Space>
            <Pagination
            // defaultCurrent={1}
            // total={filterVocab.length}
            // onChange={onChange}
            // size="small"
            // current={page}
            />
          </Space>

          {/* {renderVocabInSub} */}
        </Space>
        {/* {!VocabLoading && !vocabsInSub.length && renderEmpty} */}
        {/* {VocabLoading && <Spin spinning={VocabLoading} />} */}
      </div>
    </Space>
  );
};

export default LeitnerLevel;
