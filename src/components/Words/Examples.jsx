import { Space } from "antd";
import React from "react";
import "./Examples.scss";
const Examples = ({ examples }) => {
  return (
    <Space className="examples" direction="vertical">
      <Space className="title">Examples</Space>
      <Space className="examples__body" direction="vertical">
        {examples &&
          examples.map((examples, index) => (
            <Space key={index} className="examples__content">
              {index + 1 + ". " + examples}
            </Space>
          ))}
      </Space>
    </Space>
  );
};

export default Examples;
