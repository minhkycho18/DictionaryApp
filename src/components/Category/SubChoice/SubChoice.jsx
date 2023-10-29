import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { getSubByWlsId } from "../../../api/Subcategory/subcategory.api";

const SubChoice = (props) => {
  const [subcategories, setSub] = useState();

  useEffect(() => {
    const _getSub = async () => {
      const response = await getSubByWlsId(props.wlId);
      setSub(response);
    };
    _getSub();
  }, [props.wlId]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {subcategories &&
        subcategories.map((sub, index) => (
          <Space
            className="item__category"
            key={sub.subcategoryId}
            onClick={() =>
              props.onAdd({ wordListId: props.wlId, SubId: sub.subcategoryId })
            }
          >
            <Space style={{ padding: "0px 16px" }}>{sub?.title}</Space>
          </Space>
        ))}
    </Space>
  );
};

export default SubChoice;
