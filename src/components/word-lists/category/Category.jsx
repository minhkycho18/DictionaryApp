import React from "react";
import "./Category.scss";
import { Image, Space } from "antd";
import category from "../../../assets/images/category-back.png";
import category_default from "../../../assets/images/category-back-default.png";
const Category = ({ wl, isSelf, onSelect }) => {
  return (
    <Space
      className="category"
      direction="vertical"
      onClick={() => onSelect(wl)}
    >
      <Image
        className="category__image"
        width={135}
        src={isSelf ? category : category_default}
        preview={false}
      ></Image>
      <Space className="category__name">{wl?.title}</Space>
    </Space>
  );
};

export default Category;
