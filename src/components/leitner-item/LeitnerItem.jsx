import { Space } from "antd";
import React from "react";
import { ContainerOutlined } from "@ant-design/icons";
const LeitnerItem = (props) => {
  return (
    <Space className="box-option" direction="vertical">
      <Space className="box-option_title">{props?.title}</Space>
      <Space className="box-option_count" direction="horizontal">
        <Space>
          <ContainerOutlined />
          <Space className="box-option_count--num">{props?.count}</Space>Words
        </Space>
      </Space>
    </Space>
  );
};

export default LeitnerItem;
