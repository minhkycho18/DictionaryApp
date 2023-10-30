import React from 'react';
import {Layout, Row, Col, Space, Table, Tag, Input} from 'antd';
import "./Manager.scss";
import ManagerSider from "../../components/sider/ManagerSider";
const { Search } = Input;

const {Header, Content, Footer, Sider} = Layout;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, {tags}) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    }
];

const Manager = () => {
    return (
        <Layout
            className={"layout-container"}
            style={{
                marginLeft: 280,
            }}
        >
            <ManagerSider/>
            <Content className={"content-container"}>
                <Space
                    className={"content-container_box"}
                    direction={"vertical"}
                    size={"large"}
                >
                    <Row className={"box_title"}>
                        <Col className={"title"} span={24}>Dashboard</Col>
                    </Row>
                    <div className={"box_data"}>
                        <Row justify={"end"} className={"box_data_item search_box"}>
                            <Col span={8}>
                                <Search placeholder="Seach 'name'" enterButton="Search" size="large" />
                            </Col>
                        </Row>
                        <Row justify={"center"} className={"box_data_item table_box"}>
                            <Col span={22}>
                                <Table bordered columns={columns} dataSource={data}/>
                            </Col>
                        </Row>
                    </div>
                </Space>
            </Content>
        </Layout>
    );
};
export default Manager;