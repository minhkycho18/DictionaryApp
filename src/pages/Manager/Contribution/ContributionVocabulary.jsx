import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Space } from "antd";
import ContributionDataTable from "../../../components/data-table/Contribution/ContributionDataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContributionVocab } from "../../../stores/search-word/searchThunk";
import { setContributionVocab } from "../../../stores/search-word/searchSlice";

const ContributionVocabulary = () => {
  const [dataSearch, setDataSearch] = useState([]);
  const [searching, setSearching] = useState(false);
  const { contributionVocab, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContributionVocab());
  }, []);

  const handleApprove = (record) => {
    dispatch(setContributionVocab(record.id));
  };

  const handleReject = (record) => {
    dispatch(setContributionVocab(record.id));
  };

  const handleSearch = (keyword) => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword === "") {
      setDataSearch([]);
    } else {
      const lowerKeyword = trimmedKeyword.toLowerCase();
      const newData = contributionVocab.filter((item) =>
        item.word.toLowerCase().startsWith(lowerKeyword)
      );
      setDataSearch(newData);
    }
    setSearching(!!trimmedKeyword);
  };

  const handleTableChange = (record) => {};
  return (
    <>
      <Space
        className={"content-container_box"}
        direction={"vertical"}
        size={"large"}
      >
        <Row className={"box_title"}>
          <Col className={"title"} span={24}>
            Contribution Vocabulary
          </Col>
        </Row>
        <div className="box_data" style={{ gap: "20px" }}>
          <Row className={"box_data_item search_box"}>
            <Col offset={1} span={8}>
              <Space direction={"vertical"}>
                <span className="pos_filter-title">
                  Filter by <FilterOutlined />
                </span>
                <Select
                  bordered
                  placeholder="-- All --"
                  style={{ width: 200 }}
                  className="pos_filter-select"
                />
              </Space>
            </Col>
            <Col
              offset={7}
              span={8}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Input
                className="search_vocab"
                placeholder={`Search Vocabulary`}
                prefix={
                  <SearchOutlined
                    style={{ color: "#bbb", padding: "0px 4px" }}
                  />
                }
                // suffix={
                //   searching && (
                //     <CloseOutlined
                //       style={{
                //         fontSize: "12px",
                //         padding: "2px",
                //         marginLeft: "2px",
                //         textAlign: "center",
                //         cursor: "pointer",
                //       }}
                //     ></CloseOutlined>
                //   )
                // }
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              ></Input>
            </Col>
          </Row>
          <Row justify={"center"} className={"box_data_item table_box"}>
            <Col span={22}>
              <ContributionDataTable
                loading={loading}
                dataSource={searching ? dataSearch : contributionVocab}
                handleAprroveVocab={handleApprove}
                handleRejectVocab={handleReject}
                onTableChange={handleTableChange}
              />
            </Col>
          </Row>
        </div>
      </Space>
    </>
  );
};

export default ContributionVocabulary;
