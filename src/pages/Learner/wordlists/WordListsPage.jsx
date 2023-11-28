import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Tabs,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Subcategory from "../../../components/Category/Subcategory";
import { capitalizeFirstLetter } from "../../../helpers/changeTitle";
import {
  createSubcategory,
  deleteSubcategory,
  getAllVocabInSubcategory,
  getSubcategory,
} from "../../../stores/subcategory/subcategoryThunk";
import "./WordListsPage.scss";
function WordListsPage() {
  let { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { loading, subcategories } = useSelector((state) => state.subcategory);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [titleInput, setTitleInput] = useState("");

  //==========================================================================

  useEffect(() => {
    dispatch(getSubcategory({ wordlistId: id }));
  }, [dispatch, id]);
  //==========================================================================

  const handleDeleteSub = (value) => {
    dispatch(
      deleteSubcategory({
        wordListId: id,
        SubId: value,
      })
    );
    messageApi.success("Deleted success!");
  };
  //==========================================================================

  const onChange = (key) => {
    const params = {
      wordListId: id,
      SubId: key,
    };
    dispatch(getAllVocabInSubcategory(params));
  };

  const showAddMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  //==========================================================================
  // const onEdit = (targetKey, action) => {
  //   if (action === "add") {
  //     showAddMenu();
  //   } else {
  //     handleDeleteSub([targetKey]);
  //   }
  // };

  //==========================================================================
  const renderSub = subcategories.map((subcategory, index) => {
    return {
      key: subcategory.subcategoryId,
      label: (
        <Space
          style={{
            alignItems: "center",
            justifyContent: "center",
            minWidth: "80px",
          }}
        >
          {capitalizeFirstLetter(subcategory.title)}
        </Space>
      ),
      children: (
        <Subcategory
          key={subcategory.subcategoryId}
          subcategory={subcategory}
          wlID={id}
          onDel={handleDeleteSub}
        />
      ),
    };
  });
  //==========================================================================

  return (
    <Space
      className={`wordlist__page ${loading ? "loading-css" : ""}`}
      direction="vertical"
    >
      {contextHolder}
      <Modal
        open={isOpen}
        title="Add new subcategories"
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setConfirmLoading(true);
              setTimeout(() => {
                dispatch(
                  createSubcategory({ wordListId: +id, title: titleInput })
                )
                  .unwrap()
                  .then((rs) => messageApi.success("Success!"))
                  .catch((e) => messageApi.error("The title is already exist"));
                form.resetFields();
                setIsOpen(false);
                setConfirmLoading(false);
              }, 1000);
            })
            .catch((info) => {
              messageApi.error("Fail!");
            });
        }}
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical" name="formAddSub">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title!",
              },
            ]}
          >
            <Input onChange={(e) => setTitleInput(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      {!loading && subcategories.length > 0 && (
        <Tabs
          tabBarExtraContent={{
            right: (
              <Button className="addSub" onClick={showAddMenu}>
                <PlusOutlined />
                <span>Add new</span>
              </Button>
            ),
          }}
          hideAdd
          tabBarStyle={{
            fontSize: 14,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 500,
            color: "#07285a",
          }}
          defaultActiveKey={subcategories[0].subcategoryId}
          items={renderSub}
          tabPosition="top"
          onChange={onChange}
          // onEdit={onEdit}
        />
      )}
      {!loading && subcategories.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: "120px",
          }}
          className="empty__sub"
          description={
            <span className="empty__sub--content">
              You don't have any categories yet. Click the button above to add
              one.
            </span>
          }
        >
          <Button
            className="empty__sub--add"
            onClick={() => setIsOpen(!isOpen)}
          >
            Create Now
          </Button>
        </Empty>
      )}
      {loading && <Spin spinning={loading} />}
    </Space>
  );
}

export default WordListsPage;
