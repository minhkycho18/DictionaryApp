import React from "react";
import "./MyWordLists.scss";
import { Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ListItem from "../../components/my-word-lists/ListItem";
const MyWordLists = () => {
  return (
    <Space className="MyWordLists">
      <Space
        className="
      MyWordLists__add"
      >
        <PlusOutlined />
      </Space>

      <ListItem />
    </Space>
  );
};

export default MyWordLists;
