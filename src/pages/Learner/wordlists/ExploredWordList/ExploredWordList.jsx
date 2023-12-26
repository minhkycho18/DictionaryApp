import React, { useEffect, useRef, useState } from "react";
import "./ExploredWordList.scss";
import { Col, Image, Input, Row, Space } from "antd";
import {
  getDefault,
  getPublic,
} from "../../../../api/WordLists/word-lists.api";
import image_public from "../../../../assets/images/public_wordlist.png";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectWl } from "../../../../stores/subcategory/subcategorySlice";
const ExploredWordList = ({ type }) => {
  const [wordLists, setWordLists] = useState([]);
  const [typeDetail, setTypeDetail] = useState({ title: "", desc: "" });
  const [inputWord, setInputWord] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (type === "public") {
      const getPublicWL = async () => {
        const result = await getPublic();
        setWordLists(result);
        setTypeDetail({
          title: "Public Word Lists",
          desc: "On this page, you can search and learn through wordlists shared by people",
        });
      };
      getPublicWL();
    }
    if (type === "default") {
      const getDefaultWl = async () => {
        const result = await getDefault();
        setWordLists(result);
        setTypeDetail({
          title: "Default Word Lists",
          desc: "On this page, you can search and learn through wordlists pre-set by our system, with different topics and content.",
        });
      };
      getDefaultWl();
    }

    return () => {};
  }, [type]);

  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputWord(newValue);
    debounceInputKey(newValue);
  };

  const debounceInputKey = useRef(
    debounce((nextValue) => {
      setKeyword(nextValue);
    }, 300)
  ).current;
  const searchResult = wordLists.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleSelectCategory = (wl) => {
    dispatch(selectWl(wl));
    navigate(`/vocabulary/detail?id=${wl?.id}`);
  };
  const renderWl = searchResult.map((wl, index) => (
    <Col key={index} className="col-css" span={12}>
      <div className="ExploredWordList__item">
        <Space className="item_image">
          <Image src={image_public} width={135} preview={false}></Image>
        </Space>
        <Space direction="vertical" className="item_body">
          <Space direction="vertical" className="item_content">
            <Space className="item_content__title">{wl?.title}</Space>
            <div className="item_content__time">
              Created at <span>{wl?.createdAt}</span> by{" "}
              <span className="item_content__user">{wl?.createdBy}</span>
            </div>
            <Space className="item_content__description">{wl?.listDesc}</Space>
          </Space>
          <Space
            className="item_content__btn wldetail__card-iconLearn "
            style={{ float: "right" }}
            onClick={() => handleSelectCategory(wl)}
          >
            Detail
          </Space>
        </Space>
      </div>
    </Col>
  ));
  return (
    <Space className="wrap mainwrap ExploredWordList" direction="vertical">
      <Space className="ExploredWordList__header" direction="vertical">
        <Space className="ExploredWordList__title">{typeDetail.title}</Space>
        <Space className="ExploredWordList__description">
          {typeDetail.desc}
        </Space>
      </Space>
      <Input
        className="search__sub search__vocab"
        placeholder="Search"
        prefix={
          <SearchOutlined style={{ color: "#bbb", padding: "0px 4px" }} />
        }
        value={inputWord}
        onChange={onChangeInput}
        style={{ float: "right", marginBottom: 16 }}
      ></Input>
      <Row className="" gutter={[32, 32]}>
        {renderWl}
      </Row>
    </Space>
  );
};

export default ExploredWordList;
