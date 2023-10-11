import React from "react";
import "./WordLists.scss";
import { Button, Card, Space } from "antd";
import Category from "./category/Category";
import { PlusOutlined } from "@ant-design/icons";
import getTokenFromStorage from "../../helpers/getTokenFromStorage";
import { useNavigate } from "react-router-dom";

const WordLists = (props) => {
  const navigate = useNavigate();
  const handleAddNewWL = (e) => {
    const token = getTokenFromStorage();
    if (token) {
      navigate("/dashboard/wordLists");
    } else navigate("/auth/sign-in");
  };
  return (
    <Space className="wordLists" direction="horizontal">
      <Card className="wordLists__card">
        <p className="wordLists__card--title">Your Word Lists</p>
        <p className="wordLists__card--intro">Create your own word list</p>
        <Button className="wordLists__card--btn">Explore</Button>
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

        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </Space>
    </Space>
  );
};

export default WordLists;
