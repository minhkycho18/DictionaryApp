import {
  CaretRightOutlined,
  ContainerOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Collapse,
  Empty,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  notification,
} from "antd";
import { upperFirst } from "lodash";
import { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FiFolderPlus } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addVocabToLeitner } from "../../../api/Leitner/leitner.api";
import {
  cloneSubcategory,
  getAllVocabInSub,
} from "../../../api/Subcategory/subcategory.api";
import { getAllPos } from "../../../api/Vocabulary/vocabulary.api";
import {
  cloneWordLists,
  getDefault,
  getPublic,
} from "../../../api/WordLists/word-lists.api";
import logo from "../../../assets/images/category-back.png";
import SubChoice from "../../../components/Category/SubChoice/SubChoice";
import colorPos from "../../../helpers/ColorPos";
import getTokenFromStorage from "../../../helpers/getTokenFromStorage";
import { getSubcategory } from "../../../stores/subcategory/subcategoryThunk";
import {
  createNewWL,
  getAllWL,
  getWLById,
  getWordListsPublic,
} from "../../../stores/word-lists/wordLists-thunk";
import "./WordListDetail.scss";
const WordListDetail = (props) => {
  const [searchParams] = useSearchParams();
  const [query] = useState(searchParams.get("id"));
  const { subcategories } = useSelector((state) => state.subcategory);
  const { selectedWordList, wordLists, loading } = useSelector(
    (state) => state.wordLists
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [api, contextHolderMsg] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddWL, setIsAddWL] = useState(false);
  const [wlTitle, setWlTitle] = useState("");
  const [wlDesc, setWlDesc] = useState("");
  const [wlType, setWlType] = useState("PUBLIC");
  const [subAddedID, setSubAddedID] = useState();
  const [isPublic, setIsPublic] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const token = getTokenFromStorage();
  const [vocabInSub, setVocabInSub] = useState({});
  const [allPos, setAllPos] = useState([]);
  const [currentSub, setCurrentSub] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [titleSub, setTitleSub] = useState("Back");

  useEffect(() => {
    dispatch(getWordListsPublic());
    dispatch(getWLById(query));
    dispatch(getAllWL());
    dispatch(getSubcategory({ wordlistId: query }));
    const _getAllPos = async () => {
      try {
        const result = await getAllPos();
        setAllPos(["All", ...result]);
      } catch (error) {
        console.log(error);
      }
    };
    _getAllPos();
    return () => {};
  }, [dispatch, query]);
  useEffect(() => {
    const publicWL = async () => {
      const rs = await getPublic();
      const rsDefault = await getDefault();
      const isPub = rs.some(
        (item) => JSON.stringify(item) === JSON.stringify(selectedWordList)
      );
      setIsDefault(
        rsDefault.some(
          (item) => JSON.stringify(item) === JSON.stringify(selectedWordList)
        )
      );
      if (rs) {
        setIsPublic(isPub);
      }
    };
    publicWL();
    return () => {};
  }, [selectedWordList]);

  //============================================================//============================================================
  const handleDetail = (value, title = "Back") => {
    setCurrentSub(value);
    setTitleSub(title);
    const params = {
      wordListId: +query,
      SubId: value,
      offset: 0,
      limit: 10,
    };
    const getAllVocab = async () => {
      try {
        const result = await getAllVocabInSub(params);
        if (result) {
          setVocabInSub(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllVocab();
  };
  const handleBack = () => {
    setVocabInSub({});
    setTitleSub("Back");
  };
  const renderVocabInSub =
    vocabInSub?.content?.length > 0 &&
    vocabInSub?.content?.map((vocab, index) => (
      <Space
        className="subcategory-item"
        style={{ alignSelf: "center", width: "100%" }}
        key={index}
      >
        <Space className="subcategory__header" direction="vertical">
          <Space className="vocabulary">
            <Space className="vocabulary__title">{vocab?.word}</Space>
            <Space className="vocabulary__phonetic">
              {vocab?.phoneUs || vocab?.phoneUk}
            </Space>
          </Space>
          <Space className="subcategory__content">
            {vocab?.definition?.wordDesc}
          </Space>
        </Space>
        <Space>
          <Tag color={colorPos.get(vocab?.pos)} style={{ fontSize: "15px" }}>
            {upperFirst(vocab?.pos)}
          </Tag>
        </Space>
      </Space>
    ));

  const onPageChange = (value) => {
    setCurrentPage(value);
    setOffset((value - 1) * 10);
    const params = {
      wordListId: +query,
      SubId: currentSub,
      offset: (value - 1) * 10,
      limit: 10,
    };
    const getAllVocab = async () => {
      try {
        const result = await getAllVocabInSub(params);
        if (result) {
          setVocabInSub(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllVocab();
  };
  const renderEmpty = (
    <Empty
      style={{
        padding: 64,
      }}
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: "120px",
      }}
      className=""
      description={
        <span className="empty__sub--content">
          It don't have any vocabulary yet.
        </span>
      }
    ></Empty>
  );
  //============================================================//============================================================
  const openNotificationWithIcon = (type, msg) => {
    switch (type) {
      case "success":
        api[type]({
          message: "Success",
          description: msg,
        });
        break;
      case "error":
        api[type]({
          message: "Error",
          description: msg,
        });
        break;
      case "info":
        api[type]({
          message: "Info",
          description: msg,
        });
        break;
      default:
        break;
    }
  };
  const addToWL = async (value) => {
    const params = { ...value, sourceSubcategoryId: subAddedID };
    try {
      const rs = await cloneSubcategory(params);
      if (rs) {
        openNotificationWithIcon("success", "Clone successfully!");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Clone fail! Please try again.");
    }

    setIsModalOpen(false);
  };
  const onHandleEdit = (selectedWordList) => {
    navigate(
      `/dashboard/wordLists/${selectedWordList?.title}/${selectedWordList?.id}`
    );
  };

  const openAddNewWL = () => {
    setIsAddWL(!isAddWL);
  };
  const handleAddNewWL = () => {
    const params = {
      title: wlTitle,
      listDesc: wlDesc,
      listType: wlType,
    };
    dispatch(createNewWL(params));

    setIsAddWL(!isAddWL);
  };
  const handleCloneWLConfirm = async () => {
    try {
      const result = await cloneWordLists(query);
      if (result) {
        openNotificationWithIcon("success", "Clone successfully!");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Clone fail! Please try again.");
    }
  };

  const info = (msg) => {
    Modal.confirm({
      title: "Login",
      okText: "Sign In",
      cancelText: "Cancel",
      onOk() {
        navigate("/auth/sign-in");
      },
      onCancel() {},
      content: (
        <Space className="popconfirm-text">
          <p>{msg}</p>
        </Space>
      ),
    });
  };
  const handleCloneSubcategory = (e) => {
    if (token) {
      setSubAddedID(e);
      setIsModalOpen(true);
    } else {
      info("In order to add the word to your categories you must sign in.");
    }
  };
  const handleCloneWL = (e) => {
    if (token) {
      modal.confirm({
        title: "Clone Wordlist",
        icon: <ExclamationCircleOutlined />,
        content: "Do you want to add this wordlist ?",
        okText: "Ok",
        cancelText: "Cancel",
        onOk: handleCloneWLConfirm,
      });
    } else {
      info("In order to clone this WordList you must sign in.");
    }
  };
  const handleLearn = (subcategoryId) => {
    if (token) {
      navigate(
        `/vocabulary/${selectedWordList.id}/detail/${subcategoryId}/learn`
      );
    } else {
      info("In order to learn you must sign in.");
    }
  };

  const handleAddToLeitner = async (subId, wordListId, total) => {
    if (token) {
      const sub = await getAllVocabInSub({
        wordListId: wordListId,
        SubId: subId,
        offset: 0,
        limit: total,
      });
      try {
        const data = sub.content.map((item) => {
          return {
            vocabId: item.vocabId,
            defId: item.definition.defId,
          };
        });
        const rs = await addVocabToLeitner(data);
        openNotificationWithIcon("success", rs);
      } catch (error) {
        openNotificationWithIcon("info", error);
      }
    } else {
      info("In order to add this subcategory you must sign in.");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const renderSubcategory =
    subcategories &&
    subcategories.map((subcategory, index) => (
      <Col key={index} className="col-css">
        <Space className="wldetail__card" direction="vertical">
          <Space direction="vertical">
            <Space className="wldetail__card-title">{subcategory?.title}</Space>
            <Space className="wldetail__card__wrap">
              <ContainerOutlined className="wldetail__card__icon" />
              <Space className="wldetail__card__amount">
                {subcategory?.amountOfWord}
              </Space>
              Words
            </Space>
          </Space>
          <Space
            style={{
              paddingTop: 64,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space>
              <Space
                className="wldetail__card-addLeitner"
                direction="vertical"
                onClick={() =>
                  handleAddToLeitner(
                    subcategory?.subcategoryId,
                    subcategory.wordListId,
                    subcategory.amountOfWord
                  )
                }
              >
                <Space className="wldetail__card-iconAdd">
                  <InboxOutlined />
                </Space>
                to leitner
              </Space>
              {selectedWordList.listType !== "PRIVATE" && isPublic && (
                <Space
                  className="wldetail__card-addLeitner"
                  direction="vertical"
                  onClick={() => {
                    handleCloneSubcategory(subcategory.subcategoryId);
                  }}
                >
                  <Space className="wldetail__card-iconAdd">
                    <BiAddToQueue />
                  </Space>
                  Clone sub
                </Space>
              )}
            </Space>

            {!isPublic && !isDefault && (
              <Space
                className="wldetail__card-iconLearn"
                onClick={() => handleLearn(subcategory.subcategoryId)}
              >
                Learn
              </Space>
            )}
            {isPublic && (
              <Space
                className="wldetail__card-iconLearn"
                onClick={() => {
                  handleDetail(subcategory.subcategoryId, subcategory?.title);
                }}
              >
                Detail
              </Space>
            )}
            {isDefault && (
              <Space
                className="wldetail__card-iconLearn"
                onClick={() => {
                  handleDetail(subcategory.subcategoryId, subcategory?.title);
                }}
              >
                Detail
              </Space>
            )}
          </Space>
        </Space>
      </Col>
    ));
  const renderItem =
    wordLists &&
    wordLists.map((wl, index) => ({
      key: wl.id,
      label: wl.title,
      children: <SubChoice onAdd={addToWL} wlId={wl.id}></SubChoice>,
      style: {
        marginBottom: 24,
        borderBottom: "1px solid #eee",
        fontWeight: 600,
      },
    }));
  return (
    <>
      {!loading && (
        <Space className="wldetail-wrap" direction="vertical">
          {contextHolder}
          {contextHolderMsg}
          <Space
            className="wldetail__content wldetail-wrap"
            direction="vertical"
          >
            <Avatar
              className="wldetail__content-avatar"
              size={156}
              src={logo}
            ></Avatar>
            <Space className="wldetail__content-title">
              {selectedWordList?.title}
            </Space>
            <Space className="wldetail__content-infor">
              Created at{selectedWordList.createdAt}
              {/* Created{calculateDateTime(selectedWordList.createdAt)}days ago */}
            </Space>
            <Space>{selectedWordList.listDesc}</Space>
            {!isDefault && !isPublic && (
              <Space
                className="wldetail__content-btn"
                onClick={() => onHandleEdit(selectedWordList)}
              >
                Edit
                <EditOutlined />
              </Space>
            )}

            {selectedWordList.listType !== "PRIVATE" && isPublic && (
              <Space className="wldetail__content-btn" onClick={handleCloneWL}>
                Clone Wordlist
                <FiFolderPlus />
              </Space>
            )}
          </Space>
          {vocabInSub?.content ? (
            <Space
              direction="vertical"
              style={{
                width: "80vw",
                padding: "0px 128px",
              }}
            >
              <Space
                style={{
                  marginTop: 8,
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Space
                  onClick={handleBack}
                  style={{
                    cursor: "pointer",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 18,
                  }}
                >
                  <IoArrowBackOutline style={{ fontSize: 24 }} />
                  <Space>{titleSub}</Space>
                </Space>
                {!vocabInSub?.empty && (
                  <Pagination
                    defaultCurrent={1}
                    total={vocabInSub?.totalElements}
                    onChange={onPageChange}
                    size="small"
                    current={currentPage}
                  />
                )}
              </Space>
              {loading && (
                <Space
                  style={{
                    width: "100%",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 64,
                        }}
                        spin
                      />
                    }
                  />
                </Space>
              )}

              {!loading && !vocabInSub?.empty && (
                <Space
                  direction="vertical"
                  style={{
                    width: "100%",
                  }}
                >
                  {renderVocabInSub}
                </Space>
              )}
              {!loading && vocabInSub?.empty && renderEmpty}
            </Space>
          ) : (
            <Row className="row-css" gutter={[32, 32]}>
              {renderSubcategory}
            </Row>
          )}

          <Modal
            title="Clone a Subcategory"
            open={isModalOpen}
            // onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            className="Modal_WL"
          >
            <Collapse
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              ghost
              items={renderItem}
              accordion
              className="collapse__item"
            />
            <Space className="AddNewWL_btn" direction="vertical">
              {!isAddWL && (
                <Space onClick={openAddNewWL}>
                  <PlusOutlined className="AddNewWL_btn__icon" />
                  <div className="AddNewWL_btn__content">Add new wordlist</div>
                </Space>
              )}
              {isAddWL && (
                <Space className="form-wrap" direction="vertical">
                  <Space className="form-add" direction="vertical">
                    <div className="form-label">Title:</div>
                    <Input
                      placeholder="title"
                      onChange={(e) => setWlTitle(e.target.value)}
                      value={wlTitle}
                    ></Input>
                    <div className="form-label">Descriptions:</div>
                    <Input.TextArea
                      placeholder="Descriptions"
                      onChange={(e) => setWlDesc(e.target.value)}
                      value={wlDesc}
                    ></Input.TextArea>
                    <div className="form-label">Type:</div>
                    <Select
                      placeholder="Select your type"
                      onSelect={(e) => setWlType(e)}
                      defaultValue={wlType}
                      style={{
                        width: "100px",
                      }}
                    >
                      <Select.Option value="PUBLIC">Public</Select.Option>
                      <Select.Option value="PRIVATE">Private</Select.Option>
                    </Select>
                    <Space style={{ marginTop: 8 }}>
                      <Button
                        className="form-btn--submit"
                        type="primary"
                        onClick={handleAddNewWL}
                      >
                        Submit
                      </Button>
                      <Button onClick={openAddNewWL}>Cancel</Button>
                    </Space>
                  </Space>
                </Space>
              )}
            </Space>
          </Modal>
        </Space>
      )}
    </>
  );
};

export default WordListDetail;
