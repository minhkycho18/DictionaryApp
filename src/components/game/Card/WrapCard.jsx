import { Image, Space } from "antd";
import React from "react";

import "./WrapCard.scss";
const WrapCard = (props) => {
  return (
    <Space
      style={{
        display: `${props.type === "default" ? "none" : "flex"}`,
        opacity: `${props.onSelect ? "1" : "0.6"}`,
        scale: `${props.onSelect ? "1" : "0.9"}`,
      }}
      className="wrap-card"
    >
      <Image
        src={props.imgTop}
        preview={false}
        className="wrap-card__wave"
        width={482}
      />
      <Space
        style={{ flex: 1, padding: " 0px 32px" }}
        direction="vertical"
        className="wrap-card__body"
      >
        {props.children}
      </Space>
      <Image
        src={props.imgBot}
        preview={false}
        className="review-card__wave"
        width={482}
      />
    </Space>
  );
};

export default WrapCard;
