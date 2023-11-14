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
        pointerEvents: `${props.onSelect ? "" : "none"}`,
      }}
      className="wrap-card"
    >
      {props.type === "spelling" && (
        <Space.Compact
          className="wrap-card__wave wrap-card__wave--top"
          // style={{ paddingTop: 64 }}
          direction="vertical"
        >
          <div
            style={{
              backgroundColor: "#00bfa5",
              height: 80,
              display: "inline-block",
              width: "100%",
            }}
          >
            {" "}
          </div>
          <Image src={props?.imgTop} preview={false} width={482} />
        </Space.Compact>
      )}
      {props.type !== "spelling" && (
        <Image
          src={props?.imgTop}
          preview={false}
          className="wrap-card__wave wrap-card__wave--top"
          width={482}
        />
      )}
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
