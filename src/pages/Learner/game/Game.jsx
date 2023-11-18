import { Modal, Space, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import FlashCard from "../../../components/game/Card/FlashCard";
import QuizCard from "../../../components/game/Card/QuizCard";
import ReviewCard from "../../../components/game/Card/ReviewCard";
import SpellingCard from "../../../components/game/Card/SpellingCard";
import SuccessCard from "../../../components/game/Card/SuccessCard";
import GameMenu from "../../../components/game/Menu/GameMenu";
import changeTitle from "../../../helpers/changeTitle";
import { getVocabsByGame } from "../../../stores/game/gameThunk";
import "./Game.scss";
import { LoadingOutlined } from "@ant-design/icons";

const REVIEW = "review";
const FLASH_CARD = "flashCard";
const QUIZ = "quiz";
const SPELLING = "spelling";

const Game = (props) => {
  const { result, loading } = useSelector((state) => state.game);
  let { wlId, subId } = useParams();
  const { pathname } = useLocation();
  const slide = useRef();
  changeTitle(pathname);
  const [type, setType] = useState(localStorage.getItem("gameType") || REVIEW);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, modalCtx] = Modal.useModal();
  const handleChangeLesson = (lessonType, success) => {
    const handleModalAction = (confirmed) => {
      setIsModalOpen(false);
      if (confirmed) {
        setCurrent(0);
        setType(lessonType);
      }
    };
    if (lessonType.toLowerCase() !== type.toLowerCase() && !success) {
      setIsModalOpen(true);

      modal.confirm({
        content: (
          <Space direction="vertical" className="modal__content1">
            <Space className="modal__content1__title">Are you sure ?</Space>
            <Space className="modal__content1__body">
              Your progress will be lost.
            </Space>
          </Space>
        ),
        icon: <></>,

        onOk: () => handleModalAction(true),
        onCancel: () => handleModalAction(false),
        okText: <Space>Yes</Space>,
        cancelText: <Space>No</Space>,
        centered: true,
        okButtonProps: {
          className: "modal__button1 modal__button1--ok",
        },
        cancelButtonProps: {
          className: "modal__button1 modal__button1--cancel",
        },
      });
    }
    if (success) {
      handleModalAction(success);
    }
  };
  const handleChangeSlide = () => {
    if (slide && slide.current) {
      slide.current.next();
    }
  };

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  const newArr = [1, 2, 3, 4, 5];

  useEffect(() => {
    localStorage.setItem("gameType", type);
    dispatch(
      getVocabsByGame({
        wordlistId: wlId,
        subcategoryId: subId,
        gameType: type.toLowerCase(),
      })
    );
  }, [dispatch, subId, type, wlId]);
  const renderCard = () => {
    switch (type) {
      case REVIEW:
        const a = result && (
          <Carousel
            arrows={true}
            showDots={false}
            draggable={true}
            responsive={responsive}
            slidesToSlide={1}
            ref={slide}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
          >
            <ReviewCard type={"default"} />
            {result.map((item, index) => (
              <ReviewCard
                key={index}
                onSelect={current === index}
                vocabInfo={item}
              />
            ))}
            <SuccessCard
              type={"success-review"}
              onSelect={current === result.length}
              handleChangeLesson={handleChangeLesson}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
        return a;
      case FLASH_CARD:
        return (
          <Carousel
            showDots={false}
            arrows={false}
            responsive={responsive}
            draggable={false}
            slidesToSlide={0}
            ref={slide}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
            transitionDuration={2}
          >
            <ReviewCard type={"default"} />
            {newArr.map((item, index) => (
              <FlashCard
                key={index}
                onSelect={current === index}
                handleChangeSlide={handleChangeSlide}
              />
            ))}
            <SuccessCard
              type={"success-flash_card"}
              onSelect={current === newArr.length}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
      case SPELLING:
        return (
          <Carousel
            arrows={false}
            showDots
            responsive={responsive}
            slidesToSlide={1}
            ssr={false}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
            ref={slide}
          >
            <ReviewCard type={"default"} />
            {newArr.map((item, index) => (
              <SpellingCard
                indexKey={index}
                key={index}
                onSelect={current === index}
                handleChangeSlide={handleChangeSlide}
              />
            ))}
            <SuccessCard
              type={"success-flash_card"}
              onSelect={current === newArr.length}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
      case QUIZ:
        return (
          <Carousel
            arrows
            showDots
            responsive={responsive}
            slidesToSlide={1}
            ssr={false}
            ref={slide}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
          >
            <ReviewCard type={"default"} />
            {newArr.map((item, index) => (
              <QuizCard key={index} onSelect={current === index} />
            ))}
            <ReviewCard type={"default"} />
          </Carousel>
        );
      default:
        return (
          <Carousel
            arrows={true}
            //   showDots
            draggable={true}
            responsive={responsive}
            slidesToSlide={1}
            ref={slide}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
          >
            <ReviewCard type={"default"} />
            {result.map((item, index) => (
              <ReviewCard
                key={index}
                onSelect={current === index}
                vocabInfo={item}
              />
            ))}
            <SuccessCard
              type={"success-review"}
              onSelect={current === result.length}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
    }
  };
  return (
    <Space className="game game-wrap" direction="vertical">
      {loading ? (
        <Space
          style={{
            width: "100%",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Spin spinning={loading} size="large" /> */}
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
      ) : (
        renderCard()
      )}
      {/* <Modal
        centered
        open={isModalOpen}
        destroyOnClose={true}
        okText={<span>Ok</span>}
        cancelText={<span>Cancel</span>}
        onOk={handleOkChange}
        onCancel={handleCancel}
      >
        <Space>Are you sure? </Space>
        <Space>Your progress will be lost. </Space>
      </Modal> */}
      {modalCtx}
      <GameMenu onChangeLesson={handleChangeLesson} lesson={type} />
    </Space>
  );
};

export default Game;
