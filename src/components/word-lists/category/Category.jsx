import React from "react";
import "./Category.scss";
import { Image, Space } from "antd";
import category from "../../../assets/images/category-back.png";
const Category = () => {
  return (
    <Space className="category" direction="vertical">
      <Image
        className="category__image"
        width={135}
        src={category}
        preview={false}
      ></Image>
      <Space className="category__name">Free word List</Space>
    </Space>
  );
};

export default Category;
