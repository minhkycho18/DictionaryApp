import { Breadcrumb, Layout, Space, theme } from "antd";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import CustomSider from "../../components/sider/CustomSider";
import changeTitle from "../../helpers/changeTitle";
import getFullPath from "../../helpers/getPath";
import "./dashboard.scss";
const { Header, Content } = Layout;
const Dashboard = () => {
  const { pathname } = useLocation();
  changeTitle(pathname);
  const path = getFullPath(pathname);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const itemBreadcum = [
    {
      title: path.parent,
    },
    {
      title: <Link href="">{path.child}</Link>,
    },
  ];
  return (
    <Layout style={{ position: "relative" }}>
      <CustomSider />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 125,
            border: "1px solid #eee",
          }}
        >
          <Space direction="vertical" className="headerPage">
            <Space className="headerPage__name">{path.child}</Space>
            <Breadcrumb items={itemBreadcum} className="headerPage__breadcum" />
          </Space>
        </Header>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
