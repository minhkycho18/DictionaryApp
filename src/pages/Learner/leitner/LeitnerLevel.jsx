import {
  DeleteOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Empty,
  Input,
  Pagination,
  Select,
  Space,
  Spin,
  Tag,
  Tooltip,
} from "antd";
import { debounce, upperFirst } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  changeLevelVocab,
  deleteVocabInLeitner,
  getLeitnerVocabs,
} from "../../../api/Leitner/leitner.api";
import { getAllPos } from "../../../api/Vocabulary/vocabulary.api";
import colorPos from "../../../helpers/ColorPos";
import { setCurrentLeitnerLevel } from "../../../stores/leitner/leitnerSlice";
import "./LeitnerGame.scss";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import DeleteModal from "../../Manager/WordList/CustomModals/DeleteModal";
import compareDate from "../../../helpers/checkDateTimeLearned";
const LeitnerLevel = (props) => {
  const loader = useLoaderData();
  const [vocabs, setVocabs] = useState();
  const [allPos, setAllPos] = useState([]);
  const [keyword, setKeywords] = useState("");
  const [currentPos, setCurrentPos] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //=======================================================================================================================================================
  useEffect(() => {
    setLoading(true);
    dispatch(setCurrentLeitnerLevel(+loader.data.level));
    const _getAllVocab = async () => {
      const result = await getLeitnerVocabs({
        level: +loader.data.level,
        offset: offset,
        pos: currentPos === "All" ? null : currentPos,
      });
      if (result) {
        setVocabs(result);
        setLoading(false);
      }
    };
    const _getAllPos = async () => {
      try {
        const result = await getAllPos();
        setAllPos(["All", ...result]);
      } catch (error) {
        console.log(error);
      }
    };
    _getAllPos();
    _getAllVocab();
  }, [currentPos, dispatch, loader.data.level, offset]);
  //=======================================================================================================================================================

  const onChangePosFilter = async (value) => {
    setCurrentPos(value);
    try {
      const result = await getLeitnerVocabs({
        level: +loader.data.level,
        pos: value === "All" ? null : value,
        offset: offset,
      });
      if (result) {
        setVocabs(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onPageChange = (value) => {
    setCurrentPage(value);
    setOffset((value - 1) * 10);
  };
  const onChangeInput = (event) => {
    const newValue = event.target.value;
    setKeywords(newValue);
    debounceInputKey({ keyword: newValue, pos: currentPos });
  };

  const debounceInputKey = useRef(
    debounce(async (nextValue) => {
      try {
        const result = await getLeitnerVocabs({
          level: +loader.data.level,
          pos: nextValue.pos === "All" ? null : nextValue.pos,
          offset: offset,
          keyword: nextValue.keyword,
        });
        if (result) {
          setVocabs(result);
        }
      } catch (error) {
        console.log(error);
      }
    }, 500)
  ).current;
  //=======================================================================================================================================================
  const onChangeList = (item) => {
    const isSelected = selectedIds.some(
      (selectedItem) =>
        selectedItem.vocabId === item.vocabId &&
        selectedItem.defId === item.defId
    );

    if (isSelected) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter(
          (selectedItem) =>
            selectedItem.vocabId !== item.vocabId ||
            selectedItem.defId !== item.defId
        )
      );
    } else {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, item]);
    }
  };
  const onCheckAllChange = (e) => {
    const checkAllItem = vocabs.content.map((vocab) => ({
      vocabId: vocab.vocabId,
      defId: vocab.definition.defId,
    }));
    setSelectedIds(e.target.checked ? checkAllItem : []);
  };
  //=======================================================================================================================================================
  const handleDeleteVocab = async () => {
    try {
      const result = await deleteVocabInLeitner(selectedIds);
      if (result) {
        const updatedVocabs = vocabs.content.filter((vocab) => {
          return !selectedIds.some(
            (selectedItem) =>
              selectedItem.vocabId === vocab.vocabId &&
              selectedItem.defId === vocab.definition.defId
          );
        });
        setVocabs({
          ...vocabs,
          content: updatedVocabs,
        });
        setSelectedIds([]);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {}
  };
  //=======================================================================================================================================================

  const renderEmpty = (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: "120px",
      }}
      className=""
      description={
        <span className="empty__sub--content">
          You don't have any vocab yet.
        </span>
      }
    ></Empty>
  );

  //=======================================================================================================================================================

  const checkAll = vocabs && vocabs.content.length === selectedIds.length;
  const indeterminate =
    selectedIds.length > 0 && selectedIds.length < vocabs.content.length;

  //=======================================================================================================================================================

  const renderVocabInSub =
    vocabs &&
    vocabs?.content.map((vocab, index) => (
      <Space className="subcategory-item" key={index}>
        <Space>
          <Checkbox
            onChange={() =>
              onChangeList(
                {
                  vocabId: vocab.vocabId,
                  defId: vocab.definition.defId,
                },
                !selectedIds.some(
                  (item) =>
                    item.vocabId === vocab.vocabId &&
                    item.defId === vocab.definition.defId
                )
              )
            }
            checked={selectedIds.some(
              (item) =>
                item.vocabId === vocab.vocabId &&
                item.defId === vocab.definition.defId
            )}
            className="checkbox__del"
          ></Checkbox>
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
        </Space>
        <Space>
          <Tag color={colorPos.get(vocab?.pos)} style={{ fontSize: "15px" }}>
            {upperFirst(vocab?.pos)}
          </Tag>

          {+loader.data.level !== 0 && (
            <PiClockCounterClockwiseBold
              style={{
                fontSize: "20px",
                color: `${
                  compareDate(vocab?.studyTime) ? "#52c41a" : "#ff7875"
                }`,
              }}
            />
          )}
        </Space>
      </Space>
    ));
  //=======================================================================================================================================================
  const upLevelVocab = async () => {
    const params = {
      level: loader?.data?.level,
      leitnerIds: [...selectedIds],
    };
    const data = { statusLevel: "up", params: params };
    try {
      const rs = await changeLevelVocab(data);
      console.log(rs);
      if (rs) {
        const updatedVocabs = vocabs.content.filter((vocab) => {
          return !selectedIds.some(
            (selectedItem) =>
              selectedItem.vocabId === vocab.vocabId &&
              selectedItem.defId === vocab.definition.defId
          );
        });
        setVocabs({
          ...vocabs,
          content: updatedVocabs,
        });
        setSelectedIds([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Space className="subcategory" direction="vertical">
      <div className="subcategory__back" direction="vertical">
        {/* {contextHolder} */}

        <Space direction="vertical">
          <Space
            style={{
              marginTop: 8,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space>
              <Space className="delete-btn">
                <Checkbox
                  style={{
                    marginLeft: 12,
                  }}
                  indeterminate={indeterminate}
                  onClick={onCheckAllChange}
                  checked={checkAll}
                ></Checkbox>
                <Tooltip title="Delete selected items" color={"danger"}>
                  <DeleteOutlined
                    className="delete-btn__icon"
                    style={{
                      color: `${selectedIds.length > 0 ? "red" : "black"}`,
                    }}
                    onClick={() => setIsDeleteModalOpen(true)}
                  />
                </Tooltip>
              </Space>

              <Select
                bordered
                placeholder="Part of speech"
                style={{ width: 200 }}
                className="pos_filter-select"
                options={allPos.map((item) => ({
                  value: item,
                  label: upperFirst(item),
                }))}
                defaultValue={"All"}
                value={currentPos}
                onChange={onChangePosFilter}
              />
            </Space>
            <Space>
              {+loader.data.level === 0 && (
                <Button
                  type="primary"
                  onClick={() => {
                    upLevelVocab();
                    navigate("/dashboard/leitner/Starting");
                  }}
                  disabled={selectedIds.length <= 0}
                >
                  Start to learn
                </Button>
              )}
              <Input
                className="search__sub search__vocab"
                placeholder="Search"
                prefix={
                  <SearchOutlined
                    style={{ color: "#bbb", padding: "0px 4px" }}
                  />
                }
                value={keyword}
                onChange={onChangeInput}
              ></Input>
              {!vocabs?.empty && (
                <Pagination
                  defaultCurrent={1}
                  total={vocabs?.totalElements}
                  onChange={onPageChange}
                  size="small"
                  current={currentPage}
                />
              )}
            </Space>
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
          {!loading && !vocabs?.empty && renderVocabInSub}
          {!loading && vocabs?.empty && renderEmpty}
        </Space>
        <DeleteModal
          title={`vocab`}
          isOpen={isDeleteModalOpen}
          handleDelete={handleDeleteVocab}
          handleShow={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        />
      </div>
    </Space>
  );
};

export default LeitnerLevel;
