import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Divider, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import en from "../../assets/images/en-circle.png";
import { setKeyword } from "../../stores/search-word/searchSlice";
import "./SearchBox.scss";

const SearchBox = (props) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // const { keyword, result } = useSelector((state) => state.search);

  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    const processInput = (value) => {
      dispatch(setKeyword(value));
    };

    const debounceTimeout = setTimeout(() => {
      processInput(inputValue);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [dispatch, inputValue]);

  return (
    <Space wrap className="search font align-center">
      <Input
        className="search__box font"
        size="large"
        placeholder="SEARCH FOR A WORD"
        prefix={<SearchOutlined size={28} style={{ paddingRight: "8px" }} />}
        style={{
          backgroundColor: "transparent",
        }}
        onChange={onChangeInput}
      ></Input>
      <Space className="language fontmain">
        <span className="fontmain">EN</span>

        <Divider
          type="vertical"
          style={{
            backgroundColor: "#ccc",
            margin: 0,
            height: "28px",
          }}
          className=""
        ></Divider>
        <Avatar src={en} className="language__flag"></Avatar>
      </Space>
    </Space>
  );
};

export default SearchBox;
