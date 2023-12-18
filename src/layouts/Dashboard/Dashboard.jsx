import { Breadcrumb, Button, Image, Layout, Space, theme } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import categoryBack from "../../assets/images/category-back.png";
import CustomSider from "../../components/sider/CustomSider";
import Authenticate from "../../guards/Auth/Authenticate";
import changeTitle from "../../helpers/changeTitle";
import getFullPath from "../../helpers/getPath";
import { getUserProfile } from "../../stores/user/userThunk";
import "./dashboard.scss";
import { FaGraduationCap } from "react-icons/fa6";
const { Header, Content } = Layout;
const Dashboard = () => {
  const { pathname } = useLocation();
  changeTitle(pathname);
  const path = getFullPath(pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const breadcrumbs = path.slice(0, 3).map((item, index) => {
    const isFirst = index === 0;
    if (isFirst) {
      return {
        title: <Link to={`/`}>Home</Link>,
      };
    } else {
      return {
        title: (
          <Link
            to={path[1].link}
            className={
              index === path.slice(0, 3).length - 1 ? "active-breadcrumb" : ""
            }
          >
            {decodeURI(item?.title)}
          </Link>
        ),
      };
    }
  });
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return (
    <Authenticate>
      <Layout
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          // overflowX: "hidden",
        }}
      >
        <CustomSider />
        <Layout>
          {path[3]?.title !== "Learn" && (
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                height: 125,
                border: "1px solid #eee",
                paddingLeft: 16,
                position: "relative",
              }}
            >
              {path.slice(0, 3).length === 3 && (
                <Image
                  src={categoryBack}
                  style={{ width: 100, borderRadius: 100 }}
                  preview={false}
                ></Image>
              )}

              <Space direction="vertical" className="headerPage">
                <Space className="headerPage__name">
                  {decodeURI(path[path.slice(0, 3).length - 1].title)}
                </Space>
                <Breadcrumb
                  items={breadcrumbs}
                  className="headerPage__breadcum"
                />
              </Space>
              {path[1].title === "Leitner" &&
                path[2]?.title !== "Waiting" &&
                path.length > 2 && (
                  <Space
                    style={{
                      justifyContent: "space-between",
                      // width: "100%",
                      position: "absolute",
                      right: 32,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => navigate(path[2].link + "/learn")}
                  >
                    <Button className="subcategory__study">
                      <span style={{ marginRight: 8 }}>Study</span>
                      <FaGraduationCap size={22} />
                    </Button>
                  </Space>
                )}
            </Header>
          )}
          <Content
            style={{
              minHeight: 280,
              background: colorBgContainer,
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Authenticate>
  );
};
export default Dashboard;
