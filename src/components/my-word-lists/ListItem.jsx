import React from "react";
import "./ListItem.scss";
import { Image, Popover, Space } from "antd";
import category from "../../assets/images/category-back.png";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";

const ListItem = (props) => {
  const content = (
    <Space wrap direction="vertical">
      <div style={{ cursor: "pointer" }}>
        <EditOutlined style={{ marginRight: 8 }} />
        Edit
      </div>
      <div style={{ cursor: "pointer" }}>
        <DeleteOutlined style={{ marginRight: 8 }} />
        Delete
      </div>
    </Space>
  );
  return (
    <Space className="MyWordLists__item ListItem" direction="vertical">
      <Space className="ListItem__top">
        <Image className="" width={100} src={category} preview={false}></Image>

        <Popover
          title=" "
          trigger="click"
          showArrow="hide"
          placement="bottomRight"
          className="pop"
          content={content}
          style={{ width: "20px!important" }}
        >
          <MoreOutlined
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#aaa",
              cursor: "pointer",
            }}
            className="icon-hover"
          />
        </Popover>
      </Space>
      <Space direction="vertical" className="ListItem__middle">
        <span>1-sublist</span>
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          Created at 9 days ago
        </span>
      </Space>
      <Space
        className="ListItem__bottom"
        style={{
          justifyContent: "space-between",
          display: "flex",
          cursor: "pointer",
        }}
      >
        <span>Word List Name</span>
        <RightOutlined />
      </Space>
    </Space>
  );
};

export default ListItem;
