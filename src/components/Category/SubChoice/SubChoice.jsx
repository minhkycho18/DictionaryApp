import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import {
  createSub,
  getSubByWlsId,
} from "../../../api/Subcategory/subcategory.api";
import "./SubChoice.scss";
import SubcategoryItem from "./SubcategoryItem";
const SubChoice = (props) => {
  const [subcategories, setSub] = useState();
  const [isAddWL, setIsAddWL] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [subType, setSubType] = useState("DEFAULT");
  useEffect(() => {
    const _getSub = async () => {
      try {
        const response = await getSubByWlsId(props.wlId);
        setSub(response);
      } catch (error) {
        console.log(error);
      }
    };
    _getSub();
  }, [props.wlId]);
  const openAddNewSub = () => {
    handleSetInputDefault();
    setIsAddWL(!isAddWL);
  };
  const handleAddNewSub = () => {
    const params = {
      wordListId: props.wlId,
      title: subTitle,
      subcategoryType: subType.toUpperCase(),
    };
    const _addSub = async () => {
      try {
        const response = await createSub(params);
        setSub([...subcategories, response]);
      } catch (error) {
        console.log(error);
      }
    };
    _addSub();
    handleSetInputDefault();
    setIsAddWL(!isAddWL);
  };
  const handleSetInputDefault = () => {
    setSubTitle("");
    setSubType("Default");
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {subcategories &&
        subcategories.map((sub) => (
          <SubcategoryItem
            sub={sub}
            wordListId={props.wlId}
            key={sub.subcategoryId}
            onHandleAdd={props.onAdd}
            selectedVocab={{ vocabId: props.vocabId, defId: props.defId }}
          />
        ))}

      <Space className="AddNewWL_btn AddNewSub_btn">
        {!isAddWL && (
          <Space className="" onClick={openAddNewSub}>
            <PlusOutlined className="AddNewSub_btn__icon" />
            <div className="AddNewSub_btn__content">Add new Subcategory</div>
          </Space>
        )}
        {isAddWL && (
          <Space className="form-wrap" direction="vertical">
            <Space className="form-add" direction="vertical">
              <div className="form-label">Title:</div>
              <Input
                placeholder="title"
                onChange={(e) => setSubTitle(e.target.value)}
                value={subTitle}
              ></Input>

              <div className="form-label">Type:</div>
              <Select
                placeholder="Select your type"
                onSelect={(e) => setSubType(e)}
                defaultValue={subType}
                style={{
                  width: "100px",
                }}
              >
                <Select.Option value="DEFAULT">Default</Select.Option>
                <Select.Option value="CUSTOM">Custom</Select.Option>
              </Select>
              <Space style={{ marginTop: 8 }}>
                <Button
                  className="form-btn--submit"
                  type="primary"
                  onClick={handleAddNewSub}
                >
                  Submit
                </Button>
                <Button onClick={openAddNewSub}>Cancel</Button>
              </Space>
            </Space>
          </Space>
        )}
      </Space>
    </Space>
  );
};

export default SubChoice;
