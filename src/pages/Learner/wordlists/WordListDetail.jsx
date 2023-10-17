import React, { useEffect, useState } from "react";
import "./WordListDetail.scss";
import { Avatar, Col, Row, Space } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategory } from "../../../stores/subcategory/subcategoryThunk";
import logo from "../../../assets/images/category-back.png";
import calculateDateTime from "../../../helpers/calculateDateTime";
import { EditOutlined, InboxOutlined } from "@ant-design/icons";
const WordListDetail = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("id"));
  const { subcategories, selectedWL } = useSelector(
    (state) => state.subcategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSubcategory(query));
    return () => {};
  }, [dispatch, query]);
  const renderSubcategory = subcategories.map((subcategory) => (
    <Col span={12}>
      <Space
        style={{ width: "100%!important" }}
        className="wldetail__card"
        direction="vertical"
      >
        <Space>
          <Space className="wldetail__card-title">{subcategory?.title}</Space>
          <Space className="wldetail__card-options"></Space>
        </Space>
        <Space style={{ paddingTop: 64 }}>
          <Space className="wldetail__card-addLeitner" direction="vertical">
            <Space className="wldetail__card-iconAdd">
              <InboxOutlined />
            </Space>
            to leitner
          </Space>
          <Space className="wldetail__card-iconAdd"></Space>
        </Space>
      </Space>
    </Col>
  ));
  return (
    <Space className="wldetail-wrap" direction="vertical">
      <Space className="wldetail__content wldetail-wrap" direction="vertical">
        <Avatar
          className="wldetail__content-avatar"
          size={156}
          src={logo}
        ></Avatar>
        <Space className="wldetail__content-title">{selectedWL?.title}</Space>
        <Space className="wldetail__content-infor">
          Created{calculateDateTime(selectedWL?.createdAt) || 0}days ago
        </Space>
        <Space className="wldetail__content-btn">
          Edit
          <EditOutlined />
        </Space>
      </Space>
      <Space style={{ width: "100%!important", marginTop: 64 }}>
        <Row gutter={8}>{renderSubcategory}</Row>
      </Space>
    </Space>
  );
};

export default WordListDetail;
