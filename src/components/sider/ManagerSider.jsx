import { useState } from "react";
import {
  AudioOutlined,
  FolderOutlined,
  LogoutOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Menu, Space } from "antd";
import "./ManagerSider.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../stores/authenticate/authSlice";
import Sider from "antd/es/layout/Sider";

const dashboardManagerLink = [
  {
    path: "/account",
    label: "Account",
    icon: <UserOutlined />,
  },
  {
    path: "/vocabulary",
    label: "Vocabulary",
    icon: <AudioOutlined />,
  },
  {
    path: "/wordlist",
    label: "WordList",
    icon: <FolderOutlined />,
  },
  {
    path: "/contribution",
    label: "Contribution",
    icon: <SolutionOutlined />,
  },
];

const Manager = () => {
  const navigate = useNavigate();
  // const {pathname} = useLocation();
  // const path = getFullPath(pathname);
  const dispatch = useDispatch();
  // const {profile} = useSelector((state) => state.profile);

  const [current, setCurrent] = useState("/vocabulary");

  const items = dashboardManagerLink.map((item) => ({
    key: item.path,
    icon: item.icon,
    label: item.label,
  }));

  const onNavItemClick = (e) => {
    setCurrent(e.key);
    navigate(`/manager${e.key}`);
  };

  const handleSignOut = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Sider
      width={280}
      breakpoint="lg"
      collapsedWidth="0"
      theme={"light"}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Flex
        className={"sidebar"}
        gap={"middle"}
        justify={"space-between"}
        vertical
      >
        <div className={"sidebar__ava"}>
          <Space align={"center"} direction={"vertical"} size={"middle"}>
            <Avatar shape="square" size={64} icon={<UserOutlined />} />
            <span className={"sidebar__ava__name"}>dangvannhatminh93</span>
            <span className={"sidebar__ava__role"}>Admin</span>
          </Space>
        </div>
        <Menu
          className={"sidebar__nav"}
          onClick={onNavItemClick}
          selectedKeys={[current]}
          items={items}
        />
        <div className={"sidebar__logout"}>
          <Button
            onClick={handleSignOut}
            shape={"square"}
            className={"sidebar__logout_button"}
          >
            <LogoutOutlined className={"sidebar__logout_icon"} />
            <span className={"sidebar__logout_text"}>Log out</span>
          </Button>
        </div>
      </Flex>
    </Sider>
  );
};
export default Manager;
