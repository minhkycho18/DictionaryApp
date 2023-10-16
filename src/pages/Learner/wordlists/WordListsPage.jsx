import { Space, Spin, Tabs, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Subcategory from "../../../components/Category/Subcategory";
import { capitalizeFirstLetter } from "../../../helpers/changeTitle";
import { getSubcategory } from "../../../stores/subcategory/subcategoryThunk";
import "./WordListsPage.scss";

function WordListsPage() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, error, subcategories } = useSelector(
    (state) => state.subcategory
  );
  useEffect(() => {
    dispatch(getSubcategory(id));
  }, [dispatch, id]);
  // const onChange = (key) => {
  //   console.log(key);
  // };

  const renderSub = subcategories.map((subcategory, index) => {
    return {
      key: index,
      label: capitalizeFirstLetter(subcategory?.title),
      children: (
        <Subcategory
          key={subcategory.subcategoryId}
          subcategory={subcategory}
        />
      ),
    };
  });

  const errorOpen = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  return (
    <Space
      className={`wordlist__page ${loading ? "loading-css" : ""}`}
      direction="vertical"
    >
      {contextHolder}
      {error !== null && errorOpen()}
      {!loading && (
        <Tabs
          type="card"
          tabBarStyle={{
            fontSize: 14,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 500,
            color: "#07285a",
          }}
          defaultActiveKey="0"
          items={renderSub}
          // onChange={onChange}
        />
      )}
      {loading && <Spin spinning={loading} />}
    </Space>
  );
}

export default WordListsPage;
