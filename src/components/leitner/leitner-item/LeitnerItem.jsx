import { Space } from "antd";
import React from "react";
import { ContainerOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const LeitnerItem = ({ levelItem }) => {
  const navigate = useNavigate();
  return (
    <Space
      className="box-option"
      direction=""
      onClick={() => navigate(`/dashboard/leitner/${levelItem?.levelName}`)}
    >
      <Space direction="vertical">
        <Space className="box-option_title">{levelItem?.levelName}</Space>
        <Space className="box-option_count" direction="horizontal">
          <Space>
            <ContainerOutlined />
            <Space className="box-option_count--num">
              {levelItem?.amountOfWord}
            </Space>
            Words
          </Space>
        </Space>
      </Space>
      <RightOutlined className="box-option_arrow" />
    </Space>
  );
};

export default LeitnerItem;
