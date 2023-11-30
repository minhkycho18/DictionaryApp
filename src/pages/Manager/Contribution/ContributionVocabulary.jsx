import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Space } from "antd";
import ContributionDataTable from "../../../components/data-table/Contribution/ContributionDataTable";
import { useEffect, useState } from "react";
import { getAllContributionVocabs } from "../../../api/Vocabulary/vocabulary.api";

const ContributionVocabulary = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getAllContributionVocabs();
      setDataSource(response);
    };
    getData();
  }, []);

  const handleApproveAndReject = (record) => {
    const newData = dataSource.filter((item) => {
      return item.key !== record.key;
    });
    setDataSource(newData);
  };

  const handleTableChange = (record) => {
    console.log(record);
    const newData = dataSource.filter((item) => {
      return item.key !== record.key;
    });
    setDataSource(newData);
  };
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
                // onChange={(e) => handleSearch(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row justify={"center"} className={"box_data_item table_box"}>
            <Col span={22}>
              <ContributionDataTable
                dataSource={dataSource.map((item) => {
                  return { ...item, key: item.id };
                })}
                handleAprroveVocab={handleApproveAndReject}
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
