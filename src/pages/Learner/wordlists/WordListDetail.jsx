import { EditOutlined, InboxOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../assets/images/category-back.png";
import { getSubcategory } from "../../../stores/subcategory/subcategoryThunk";
import { getWLById } from "../../../stores/word-lists/wordLists-thunk";
import "./WordListDetail.scss";
const WordListDetail = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("id"));
  const { subcategories } = useSelector((state) => state.subcategory);
  const { selectedWordList } = useSelector((state) => state.wordLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getWLById(query));
    dispatch(getSubcategory(query));
    return () => {};
  }, [dispatch, query]);
  const renderSubcategory = subcategories.map((subcategory, index) => (
    <Col key={index} className="col-css">
      <Space className="wldetail__card" direction="vertical">
        <Space>
          <Space className="wldetail__card-title">{subcategory?.title}</Space>
          <Space className="wldetail__card-options"></Space>
        </Space>
        <Space
          style={{
            paddingTop: 64,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Space className="wldetail__card-addLeitner" direction="vertical">
            <Space className="wldetail__card-iconAdd">
              <InboxOutlined />
            </Space>
            to leitner
          </Space>
          <Space className="wldetail__card-iconLearn">Learn</Space>
        </Space>
      </Space>
    </Col>
  ));
  const onHandleEdit = (selectedWordList) => {
    navigate(
      `/dashboard/wordLists/${selectedWordList?.title}/${selectedWordList?.id}`
    );
  };
  return (
    <Space className="wldetail-wrap" direction="vertical">
      <Space className="wldetail__content wldetail-wrap" direction="vertical">
        <Avatar
          className="wldetail__content-avatar"
          size={156}
          src={logo}
        ></Avatar>
        <Space className="wldetail__content-title">
          {selectedWordList?.title}
        </Space>
        <Space className="wldetail__content-infor">
          Created at{selectedWordList.createdAt}
          {/* Created{calculateDateTime(selectedWordList.createdAt)}days ago */}
        </Space>
        <Space>{selectedWordList.listDesc}</Space>
        <Space
          className="wldetail__content-btn"
          onClick={() => onHandleEdit(selectedWordList)}
        >
          Edit
          <EditOutlined />
        </Space>
      </Space>
      <Row className="row-css" gutter={[32, 32]}>
        {renderSubcategory}
      </Row>
    </Space>
  );
};

export default WordListDetail;
