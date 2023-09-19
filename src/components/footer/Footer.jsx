import { InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <Space className="footer">
      <span className="footer__content">
        Copyright © 2023 PBL6 DUT. | All Rights Reserved | Privacy Policy
      </span>
      <Space className="footer__icon">
        <InstagramOutlined />
        <TwitterOutlined />
      </Space>
    </Space>
  );
};

export default Footer;
