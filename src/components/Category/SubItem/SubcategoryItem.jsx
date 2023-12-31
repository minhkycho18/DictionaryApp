import React from "react";
import "./SubcategoryItem.scss";
import { Checkbox, Space, Tag } from "antd";
import { upperFirst } from "lodash";
import colorPos from "../../../helpers/ColorPos";
import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";

const SubcategoryItem = ({ vocab, setList, isChecked }) => {
  console.log(vocab);
  const onCheckbox = () => {
    setList(
      {
        vocabId: vocab.vocabId,
        defId: vocab.definition.defId,
      },
      !isChecked
    );
  };
  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return {
          icon: <SyncOutlined spin />,
          color: "warning",
        };
      case "REJECTED":
        return {
          icon: <MinusCircleOutlined />,
          color: "error",
        };
      case "APPROVED":
        return {
          icon: <CheckCircleOutlined />,
          color: "success",
        };
      case "PERSONAL":
        return {
          icon: <UserOutlined />,
          color: "processing",
        };
      default:
        break;
    }
  };
  return (
    <Space className="subcategory-item">
      <Space>
        <Checkbox
          onChange={onCheckbox}
          checked={isChecked}
          className="checkbox__del"
        ></Checkbox>
        <Space className="subcategory__header" direction="vertical">
          <Space className="vocabulary">
            <Space className="vocabulary__title">{vocab?.word}</Space>
            <Space className="vocabulary__phonetic">
              {vocab?.phoneUs || vocab?.phoneUk}
            </Space>
            {vocab?.status && (
              <Tag
                icon={renderStatus(vocab?.status).icon}
                color={renderStatus(vocab?.status).color}
              >
                {upperFirst(vocab?.status.toLowerCase())}
              </Tag>
            )}
          </Space>
          <Space className="subcategory__content">
            {vocab?.definition?.wordDesc}
          </Space>
        </Space>
      </Space>
      <Tag color={colorPos.get(vocab?.pos)} style={{ fontSize: "15px" }}>
        {upperFirst(vocab?.pos)}
      </Tag>
      {/* <span className="vocabulary__pos">[{vocab?.pos}]</span> */}
    </Space>
  );
};

export default SubcategoryItem;
