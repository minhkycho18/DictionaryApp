import React from "react";
import "./Category.scss";
import { Image, Space } from "antd";

const Category = ({ wl, bgImage, onSelect }) => {
  return (
    <Space
      className="category"
      direction="vertical"
      onClick={() => onSelect(wl)}
    >
      <Image
        className="category__image"
        width={135}
        // height={135}
        src={bgImage}
        preview={false}
      ></Image>
      <Space className="category__name">{wl?.title}</Space>
    </Space>
  );
};

export default Category;
