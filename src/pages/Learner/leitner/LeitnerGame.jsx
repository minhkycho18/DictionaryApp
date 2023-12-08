import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Empty, Image, Modal, Result, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import {
  changeLevelVocab,
  getLeiner,
  getLeitnerData,
} from "../../../api/Leitner/leitner.api";
import leitnerIcon from "../../../assets/images/leitner.svg";
import ReviewCard from "../../../components/game/Card/ReviewCard";
import LeitnerCard from "../../../components/leitner/Card/LeitnerCard";
import getFullPath from "../../../helpers/getPath";
import responsiveCarousel from "../../../helpers/responsiveCarousel";
import "./LeitnerGame.scss";
const LeitnerGame = (props) => {
  const { pathname } = useLocation();
  const path = getFullPath(pathname);
  const loader = useLoaderData();
  const [current, setCurrent] = useState(0);
  const slide = useRef();
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [incorrectAnswer, setIncorrectAnswer] = useState([]);
  const [vocabularies, setVocabularies] = useState([]);
  const [level, setLevel] = useState([]);
  const navigate = useNavigate();
  const [increasedLevels, setIncreasedLevels] = useState();
  const [decreasedLevels, setDecreasedLevels] = useState();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getGameByLevel = async () => {
      setLoading(true);
      try {
        const result = await getLeitnerData(loader?.data?.level);
        const level = await getLeiner();
        setVocabularies(result);
        setLevel(level);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGameByLevel();

    return () => {};
  }, [loader?.data?.level]);

  const renderCard = [
    { vocabId: "empty" },
    ...vocabularies,
    { vocabId: "empty" },
  ];
  const handleChangeSlide = () => {
    if (slide && slide.current) {
      slide.current.next();
      // slide.current;
    }
  };
  const handleCorrectFlashCard = (value) => {
    setCorrectAnswer([...correctAnswer, value]);
  };
  const handleIncorrectAnswer = (value) => {
    setIncorrectAnswer([...correctAnswer, value]);
  };
  const changeLevelVocabulary = async (statusLevel, value) => {
    const params = {
      level: loader?.data?.level,
      leitnerIds: [...value],
    };
    const data = { statusLevel: statusLevel, params: params };
    try {
      const rs = await changeLevelVocab(data);

      if (rs && statusLevel === "up" && loader.data.level !== "7") {
        const nextLevelIndex = +loader?.data?.level + 1;
        const updatedLevels = [...level];
        updatedLevels[loader?.data?.level].amountOfWord -= value.length;
        updatedLevels[nextLevelIndex].amountOfWord += value.length;
        setDecreasedLevels(+loader?.data?.level);
        setIncreasedLevels(+loader?.data?.level + 1);
        setTimeout(() => {
          setDecreasedLevels();
          setIncreasedLevels();
        }, 1000);
        setLevel(updatedLevels);
      } else if (rs && statusLevel === "down" && loader.data.level !== "1") {
        const prevLevelIndex = loader?.data?.level - 1;
        const updatedLevels = [...level];
        updatedLevels[loader?.data?.level].amountOfWord -= value.length;
        updatedLevels[prevLevelIndex].amountOfWord += value.length;
        setDecreasedLevels(+loader?.data?.level);
        setIncreasedLevels(+loader?.data?.level - 1);
        setTimeout(() => {
          setDecreasedLevels();
          setIncreasedLevels();
        }, 1000);
        setLevel(updatedLevels);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Space
      style={{
        height: "100vh",
        backgroundColor: "#f6f7f8",
        display: "flex",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <Modal centered open={isOpen} closable={false} footer={false}>
        <Result
          status="success"
          title="You have reviewed all the card!"
          style={{
            fontSize: 20,
          }}
        />
        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            color: "#0d47a1",
          }}
        >
          <Button
            type="text"
            style={{
              color: "#0d47a1",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
            }}
            onClick={() => navigate("/dashboard/leitner/")}
          >
            Back to home
          </Button>
        </Space>
      </Modal>
      {!loading && !isOpen && vocabularies.length > 0 && (
        <Carousel
          slidesToSlide={1}
          ref={slide}
          responsive={responsiveCarousel}
          afterChange={(nextSlide, { currentSlide, onMove }) => {
            setCurrent(currentSlide);
          }}
          className="carouselLeitner"
          swipeable={false}
          draggable={false}
          arrows={false}
        >
          {vocabularies &&
            renderCard.map((vocab, index) => {
              if (vocab.vocabId === "empty") {
                return <ReviewCard type={"default"} key={index} />;
              } else
                return (
                  <LeitnerCard
                    key={index}
                    vocabInfo={vocab}
                    onSelect={current === index - 1}
                    handleChangeSlide={handleChangeSlide}
                    handleCorrectFlashCard={handleCorrectFlashCard}
                    handleIncorrectAnswer={handleIncorrectAnswer}
                    changeLevelVocabulary={changeLevelVocabulary}
                    handleOpenModal={setIsOpen}
                    isLastItem={current === vocabularies.length - 1}
                  />
                );
            })}
        </Carousel>
      )}
      {!loading && vocabularies.length === 0 && (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: "120px",
          }}
          className=""
          description={<span className="">You don't have any vocab yet.</span>}
        />
      )}
      <div className="leitner-menu">
        <Space
          className="leitner-menu__back"
          direction="vertical"
          onClick={() => navigate("/dashboard/leitner/")}
        >
          <ArrowLeftOutlined />
          <Space className="">Back</Space>
        </Space>
        {!loading &&
          level &&
          level.map((item, index) => (
            <div
              className={`${
                decodeURI(path[2].title).toLowerCase() ===
                item.levelName.toLowerCase()
                  ? "leitner-menu__item--active"
                  : ""
              } leitner-menu__item`}
              key={index}
            >
              <div className="leitner-menu__item--icon">
                <Image src={leitnerIcon} preview={false} width={34} />
              </div>
              {increasedLevels === index && (
                <div className="leitner-menu__icon--cong leitner-menu__icon">
                  +
                </div>
              )}
              {decreasedLevels === index && (
                <div className="leitner-menu__icon--tru leitner-menu__icon">
                  -
                </div>
              )}
              <div className="leitner-menu__item--count">
                {item?.amountOfWord}
              </div>
            </div>
          ))}
      </div>
    </Space>
  );
};

export default LeitnerGame;
