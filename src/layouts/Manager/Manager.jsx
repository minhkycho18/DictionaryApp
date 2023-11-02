import React from 'react';
import {Layout} from 'antd';
import "./Manager.scss";
import ManagerSider from "../../components/sider/ManagerSider";
import {Outlet} from "react-router-dom";
import Authenticate from "../../guards/Auth/Authenticate";

const {Content} = Layout;

const Manager = () => {
    return (
        <Authenticate>
            <Layout
                className={"layout-container"}
                style={{
                    marginLeft: 280,
                }}
            >
                <ManagerSider/>
                <Content className={"content-container"}>
                    <Outlet/>
                </Content>
            </Layout>
        </Authenticate>
    );
};
export default Manager;