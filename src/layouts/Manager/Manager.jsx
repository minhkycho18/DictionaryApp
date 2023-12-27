import { Layout } from "antd";
import "./Manager.scss";
import ManagerSider from "../../components/sider/ManagerSider";
import { Outlet } from "react-router-dom";
// import Authenticate from "../../guards/Auth/Authenticate";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../stores/user/userThunk";
import AdminAuth from "../../guards/Auth/AdminAuth";

const { Content } = Layout;

const Manager = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return (
    <AdminAuth>
      <Layout
        className={"layout-container"}
        style={{
          marginLeft: 280,
        }}
      >
        <ManagerSider />
        <Content className={"content-container"}>
          <Outlet />
        </Content>
      </Layout>
    </AdminAuth>
  );
};
export default Manager;
