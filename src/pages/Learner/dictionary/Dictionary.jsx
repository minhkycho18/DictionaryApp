import { Col, Row, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import SearchBox from "../../../components/Words/SearchBox";
import Result from "../../../components/card/result";
import "./Dictionary.scss";
import { useNavigate } from "react-router-dom";
import Phonetic from "../../../components/Words/Phonetic";
import { useSelector } from "react-redux";
const Dictionary = () => {
  const [isSelected, setIsSelected] = useState(true);
  const { word } = useSelector((state) => state.search);
  useEffect(() => {
    setIsSelected(!word);
  }, [word]);

  const navigate = useNavigate();
  const handleSelectWord = (word) => {
    setIsSelected(true);
    navigate(`/dictionary?entry=${word}`);
  };
  return (
    <Content className="contentdic">
      <SearchBox />
      {isSelected ? (
        <Space>
          <Phonetic />
        </Space>
      ) : (
        <Space>
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <Result
                word={word}
                index={"1"}
                definition={
                  "a word that i give to test my front  end a word that i give to test my front enda word that i give to test my front enda word that i give to test my front enda word that i give to test my front enda word that i give to test my front enda word that i give to test my front end"
                }
                onSelect={handleSelectWord}
              />
            </Col>
            <Col span={12}>
              <Result
                word={word}
                index={"1"}
                definition={"a word that i give to test my front end"}
                onSelect={handleSelectWord}
              />
            </Col>
            <Col span={12}>
              <Result
                word={word}
                index={"1"}
                definition={"a word that i give to test my front end"}
                onSelect={handleSelectWord}
              />
            </Col>
          </Row>
        </Space>
      )}
    </Content>
  );
};

export default Dictionary;
