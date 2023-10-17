import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTokenFromStorage from "../../helpers/getTokenFromStorage";
import "./WordLists.scss";
import Category from "./category/Category";
import { useDispatch } from "react-redux";
import { selectWl } from "../../stores/subcategory/subcategorySlice";

const WordLists = ({ type, wordLists }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSelf, setIsSelf] = useState(true);
  useEffect(() => {
    if (type === "self") {
      setIsSelf(true);
    } else setIsSelf(false);
  }, [type]);
  const handleAddNewWL = (e) => {
    const token = getTokenFromStorage();
    if (token) {
      navigate("/dashboard/wordLists");
    } else navigate("/auth/sign-in");
  };

  const handleSelectCategory = (wl) => {
    dispatch(selectWl(wl));
    navigate(`/vocabulary/detail?id=${wl?.id}`);
  };
  const renderCategory = wordLists.map((wordlist, index) => (
    <Category
      isSelf={isSelf}
      key={wordlist.id}
      wl={wordlist}
      onSelect={handleSelectCategory}
    ></Category>
  ));
  const handleExplore = (e) => {
    if (type === "self") {
      navigate("/dashboard/wordLists");
    }
  };
  return (
    <Space className="wordLists" direction="horizontal">
      <Card
        className={`wordLists__card ${
          isSelf ? "borderCard--orange" : "borderCard--blue"
        }`}
      >
        <p className="wordLists__card--title">
          {!isSelf ? "Default WordLists" : "Your Word Lists"}
        </p>
        <p className="wordLists__card--intro">
          {isSelf
            ? "Create your own word list"
            : "Here you will find different Word lists categorized"}
        </p>

        <Button
          className={`wordLists__card--btn ${isSelf ? "" : "btn-blue"}`}
          onClick={handleExplore}
        >
          Explore
        </Button>
      </Card>
      <Space
        style={{
          backgroundColor: "#f0f7f4",
          height: "100px",
          width: "calc(100vw - 800px)",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: 16,
          overflowX: "scroll",
          overflowY: "hidden",
        }}
        className="wordLists__categories"
      >
        {isSelf && (
          <Space
            direction="vertical"
            style={{ margin: "0px 16px", cursor: "pointer" }}
            onClick={handleAddNewWL}
          >
            <Space className="wordLists__categories-icon">
              <PlusOutlined />
            </Space>
            <Space className="wordLists__categories-caption">
              Word List Name
            </Space>
          </Space>
        )}

        {renderCategory}
      </Space>
    </Space>
  );
};

export default WordLists;
