import React from "react";
import "./SubcategoryItem.scss";
import { Space } from "antd";
const SubcategoryItem = ({ vocab }) => {
  return (
    <Space className="subcategory-item" direction="vertical">
      <Space className="subcategory__header">
        <Space className="vocabulary">
          <Space className="vocabulary__title">{vocab?.word}</Space>
          <Space className="vocabulary__phonetic">
            {vocab?.phoneUs || vocab?.phoneUk}
          </Space>
        </Space>
        <span className="vocabulary__pos">[{vocab?.pos}]</span>
      </Space>
      <Space className="subcategory__content">
        {vocab?.definition?.wordDesc}
      </Space>
    </Space>
  );
};

export default SubcategoryItem;
