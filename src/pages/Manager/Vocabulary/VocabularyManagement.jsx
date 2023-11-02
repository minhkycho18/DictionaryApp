import {Col, Input, Row, Select, Space, Table, Tag} from "antd";
import React, {useEffect, useRef, useState} from "react";
import "./VocabularyManagement.scss";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResult} from "../../../stores/search-word/searchThunk";
import {BiSolidVolumeFull, BiSolidVolumeMute} from "react-icons/bi";
import colorPos from "../../../helpers/ColorPos";
import {upperFirst} from "lodash/string";
import {SearchOutlined} from "@ant-design/icons";
import {debounce} from "lodash";
import {getAllPos} from "../../../api/Vocabulary/vocabulary.api";

const columns = [
    {
        title: 'Word',
        dataIndex: 'word',
        key: 'word',
        className: 'word_cell'
    },
    {
        title: 'Part of speech',
        dataIndex: 'pos',
        key: 'pos',
        align: 'center',
        render: (text) =>
            <Tag color={colorPos.get(text)} key={text} style={{fontSize: "15px"}}>
                {upperFirst(text)}
            </Tag>
    },
    {
        title: 'Phonetic US',
        dataIndex: 'phoneUs',
        key: 'phoneUs',
        align: 'center',
        render: (text) =>
            <>
                {!text && "--"}
                {text}
            </>
    },
    {
        title: 'Phonetic UK',
        key: 'phoneUk',
        dataIndex: 'phoneUk',
        align: 'center',
        render: (text) =>
            <>
                {!text && "--"}
                {text}
            </>
    },
    {
        title: 'Audio US',
        key: 'audioUs',
        dataIndex: 'audioUs',
        align: 'center',
        render: (text) =>
            <span className="phonetic__content">
                {text && <BiSolidVolumeFull
                    disabled={false}
                    style={{cursor: "pointer"}}
                    onClick={() => new Audio(text).play()}
                />
                }
                {!text && <BiSolidVolumeMute style={{opacity: 0.5}}/>}

            </span>
    },
    {
        title: 'Audio UK',
        key: 'audioUk',
        dataIndex: 'audioUk',
        align: 'center',
        render: (text) =>
            <span className="phonetic__content">
                 {text && <BiSolidVolumeFull
                     disabled={false}
                     style={{cursor: "pointer"}}
                     onClick={() => new Audio(text).play()}
                 />
                 }
                {!text && <BiSolidVolumeMute style={{opacity: 0.5}}/>}
            </span>
    },
];

const VocabularyManagement = () => {
    const {result, loading, currentPage, totalElements} = useSelector(
        (state) => state.search
    );
    const dispatch = useDispatch();
    const [pagination, setPaginations] = useState({});
    const [keyword, setKeywords] = useState('a');
    const [pos, setPos] = useState([]);
    const [currentPos, setCurrentPos] = useState(null);

    const onChangeSearch = (event) => {
        const newValue = event.target.value;
        setKeywords(newValue);
        debounceInputKey({
            keyword: newValue,
            currentPos
        });

    };

    const onChangePosFilter = (value) => {
        setCurrentPos(value);
        dispatch(getSearchResult({keyword: keyword, offset: currentPage, pos: value}));
    };

    const debounceInputKey = useRef(
        debounce((nextValue) => {
            dispatch(getSearchResult({keyword: nextValue.keyword, offset: currentPage, pos: nextValue.currentPos}));
        }, 500)
    ).current;

    const handleTableChange = (paginationParam) => {
        dispatch(getSearchResult({keyword: keyword, offset: (paginationParam.current - 1) * 10, pos: currentPos}));
    };

    useEffect(() => {
        dispatch(getSearchResult({keyword: keyword, offset: 0, pos: currentPos}));
        const getPos = async () => {
            const result = await getAllPos();
            setPos(result);
        };
        return () => getPos();
    }, []);

    useEffect(() => {
        setPaginations({
            current: currentPage,
            total: totalElements,
            showSizeChanger: false,
            position: ["bottomCenter", "right"],
            simple: true,
            responsive: true
        })
    }, [currentPage, totalElements])


    return (
        <Space
            className={"content-container_box"}
            direction={"vertical"}
            size={"large"}
        >
            <Row className={"box_title"}>
                <Col className={"title"} span={24}>Vocabulary Management</Col>
            </Row>
            <div className={"box_data"}>
                <Row className={"box_data_item search_box"}>
                    <Col offset={1} span={8}>
                        <Space direction={"vertical"}>
                            <span className="pos_filter-title">Part of speech</span>
                            <Select
                                bordered
                                placeholder="Part of speech"
                                style={{width: 200}}
                                className="pos_filter-select"
                                options={pos.map(item => ({
                                    value: upperFirst(item),
                                    label: upperFirst(item)
                                }))}
                                onChange={onChangePosFilter}
                            />
                        </Space>

                    </Col>

                    <Col offset={7} span={8} style={{display: "flex", justifyContent: "center"}}>
                        <Input
                            className="search_vocab"
                            placeholder="Search 'name'"
                            prefix={
                                <SearchOutlined style={{color: "#bbb", padding: "0px 4px"}}/>
                            }
                            onChange={onChangeSearch}
                        ></Input>
                    </Col>
                </Row>
                <Row justify={"center"} className={"box_data_item table_box"}>
                    <Col span={22}>
                        <Table
                            loading={loading}
                            bordered
                            columns={columns}
                            pagination={pagination}
                            size={"small"}
                            dataSource={result.map((item) => ({
                                ...item,
                                key: item.id
                            }))}
                            onChange={handleTableChange}
                        />
                    </Col>
                </Row>
            </div>
        </Space>
    );
};

export default VocabularyManagement;
