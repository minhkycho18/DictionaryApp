import { Layout } from "antd";
import "./Manager.scss";
import ManagerSider from "../../components/sider/ManagerSider";
import { Outlet } from "react-router-dom";
// import Authenticate from "../../guards/Auth/Authenticate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../stores/user/userThunk";
import AdminAuth from "../../guards/Auth/AdminAuth";

const { Content } = Layout;

const Manager = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      const data = {
        name: profile.name,
        email: profile.email,
        image: profile.image,
        role: profile.role.name,
        gender: profile.gender,
      };
      localStorage.setItem("profile", JSON.stringify(data));
    }
  }, [profile]);
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
