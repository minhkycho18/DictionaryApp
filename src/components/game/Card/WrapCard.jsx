import { Image, Space } from "antd";
import React from "react";

import "./WrapCard.scss";
const WrapCard = (props) => {
  return (
    <div
      style={{
        display: `${props.type === "default" ? "none" : "flex"}`,
        opacity: `${props.onSelect ? "1" : "0.6"}`,
        scale: `${props.onSelect ? "1" : "0.9"}`,
      }}
      className="wrap-card"
    >
      <Image
        src={props?.imgTop}
        preview={false}
        className="wrap-card__wave wrap-card__wave--top"
        width={482}
      />

      {props.children}
      <Image
        src={props?.imgBot}
        preview={false}
        className="review-card__wave wrap-card__wave--bottom"
        width={482}
      />
    </div>
  );
};

export default WrapCard;
