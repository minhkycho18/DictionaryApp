import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTokenFromStorage from "../../helpers/getTokenFromStorage";
import "./WordLists.scss";
import Category from "./category/Category";
import { useDispatch } from "react-redux";
import { selectWl } from "../../stores/subcategory/subcategorySlice";
import category_self from "../../assets/images/category-back.png";
import category_default from "../../assets/images/category-back-default.png";
import category_public from "../../assets/images/public_wordlist.png";
const WordLists = ({ type, wordLists }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [typeRender, setTypeRender] = useState({
    title: "",
    description: ``,
    color: "",
    btn: "btn-blue",
    bgImage: "",
  });
  useEffect(() => {
    if (type === "self") {
      setTypeRender({
        title: "Your Word Lists",
        description: `Create your own word list`,
        color: "borderCard--orange",
        btn: "",
        bgImage: category_self,
      });
    } else if (type === "default") {
      setTypeRender({
        title: "Default WordLists",
        description: `Here you will find different Word lists categorized`,
        color: "borderCard--blue",
        btn: "btn-blue",
        bgImage: category_default,
      });
    } else
      setTypeRender({
        title: "Public WordLists",
        description: `Find different Word lists from another people`,
        color: "borderCard--blue",
        btn: "btn-blue",
        bgImage: category_public,
      });
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
      bgImage={typeRender.bgImage}
      key={wordlist.id}
      wl={wordlist}
      onSelect={handleSelectCategory}
    ></Category>
  ));

  const handleExplore = (e) => {
    if (type === "self") {
      navigate("/dashboard/wordLists");
    }
    if (type === "public") {
      navigate("/vocabulary/public");
    }
  };

  return (
    <Space className="wordLists" direction="horizontal">
      <Card className={`wordLists__card ${typeRender.color}`}>
        <p className="wordLists__card--title">{typeRender.title}</p>
        <p className="wordLists__card--intro">{typeRender.description}</p>

        <Button
          className={`wordLists__card--btn ${typeRender.btn}`}
          onClick={handleExplore}
        >
          Explore
        </Button>
      </Card>
      <Space
        style={{
          backgroundColor: "#dfe6f1",
          height: "100px",
          width: "calc(100vw - 800px)",
          boxShadow:
            " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;",
          borderRadius: 16,
          overflowX: "scroll",
          overflowY: "hidden",
        }}
        className="wordLists__categories"
      >
        {type === "self" && (
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
