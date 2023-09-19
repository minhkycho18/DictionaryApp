import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Divider, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import en from "../../assets/images/en-circle.png";
import { searchByWord } from "../../stores/search-word/searchSlice";
import "./SearchBox.scss";

const SearchBox = (props) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  // const { word } = useSelector((state) => state.search);
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const processInput = (value) => {
    dispatch(searchByWord(value));
  };
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      processInput(inputValue);
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

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
