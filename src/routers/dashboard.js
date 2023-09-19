import {
  FolderOutlined,
  InboxOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

const dashboardLink = [
  {
    path: "/profile",
    label: "Profile",
    icon: <UserOutlined />,
  },
  {
    path: "/leitner",
    label: "Leitner",
    icon: <InboxOutlined />,
  },
  {
    path: "/wordLists",
    label: "My Word Lists",
    icon: <FolderOutlined />,
  },
  {
    // path: "",
    label: "Sign Out",
    icon: <LogoutOutlined />,
  },
];
export default dashboardLink;
