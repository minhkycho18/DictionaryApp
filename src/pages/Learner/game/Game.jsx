import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Space, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { addVocabToLeitner } from "../../../api/Leitner/leitner.api";
import { updateVocabsByGameType } from "../../../api/Subcategory/game.api";
import FlashCard from "../../../components/game/Card/FlashCard";
import QuizCard from "../../../components/game/Card/QuizCard";
import ReviewCard from "../../../components/game/Card/ReviewCard";
import SpellingCard from "../../../components/game/Card/SpellingCard";
import SuccessCard from "../../../components/game/Card/SuccessCard";
import GameMenu from "../../../components/game/Menu/GameMenu";
import Overview from "../../../components/game/OverViewBox/Overview";
import changeTitle from "../../../helpers/changeTitle";
import { getGameStatus } from "../../../stores/game/gameSlice";
import { getVocabsByGame } from "../../../stores/game/gameThunk";
import "./Game.scss";

const REVIEW = "review";
const FLASH_CARD = "flashCard";
const QUIZ = "quiz";
const SPELLING = "spelling";
const OVERVIEW = "overview";

const Game = (props) => {
  const { result, loading } = useSelector((state) => state.game);
  let { wlId, subId } = useParams();
  const { pathname } = useLocation();
  const slide = useRef();
  changeTitle(pathname);
  const [type, setType] = useState(localStorage.getItem("gameType") || REVIEW);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const [, setIsModalOpen] = useState(false);
  const [modal, modalCtx] = Modal.useModal();
  const [correctAnswerFlashcard, setCorrectAnswerFlashcard] = useState([]);
  const [incorrectAnswer, setIncorrectAnswer] = useState([]);
  const [api, contextHolderMsg] = notification.useNotification();

  useEffect(() => {
    const gameTypeFromLocalStorage = localStorage.getItem("gameType");
    if (!gameTypeFromLocalStorage) {
      setType(REVIEW);
      localStorage.setItem("gameType", REVIEW);
    }
    return () => {
      localStorage.removeItem("gameType");
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("gameType", type);
    if (type !== OVERVIEW) {
      dispatch(
        getVocabsByGame({
          wordlistId: wlId,
          subcategoryId: subId,
          gameType: type.toLowerCase(),
        })
      )
        .unwrap()
        .then((rs) => {
          dispatch(getGameStatus(rs));
        });
    }

    return () => {
      localStorage.setItem("gameType", REVIEW);
    };
  }, [dispatch, subId, type, wlId]);
  const handleExit = async () => {
    const params = {
      wordListId: wlId,
      subcategoryId: subId,
      gameType: type.toLowerCase(),
      values:
        type.toLowerCase() === "review"
          ? result.map((item) => ({
              vocabId: item.vocabId,
              defId: item.defId,
            }))
          : correctAnswerFlashcard.map((item) => ({
              vocabId: item.vocabId,
              defId: item.defId,
            })),
    };
    try {
      await updateVocabsByGameType(params);
    } catch (error) {
      openNotificationWithIcon("error", "Fail to update game's status!");
    }
  };
  const handleChangeLesson = async (lessonType, success) => {
    const params = {
      wordListId: wlId,
      subcategoryId: subId,
      gameType: type.toLowerCase(),
      values:
        type.toLowerCase() === "review"
          ? result.map((item) => ({
              vocabId: item.vocabId,
              defId: item.defId,
            }))
          : correctAnswerFlashcard.map((item) => ({
              vocabId: item.vocabId,
              defId: item.defId,
            })),
    };
    const handleModalAction = async (confirmed) => {
      setIsModalOpen(false);
      if (confirmed) {
        try {
          await updateVocabsByGameType(params);
        } catch (error) {
          openNotificationWithIcon("error", "Fail to update game's status!");
        }
        setCurrent(0);
        setCorrectAnswerFlashcard([]);
        setIncorrectAnswer([]);
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
    if (lessonType.toLowerCase() !== type.toLowerCase() && success) {
      try {
        await updateVocabsByGameType(params);
      } catch (error) {
        openNotificationWithIcon("error", "Fail to update game's status!");
      }
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
  const handleCorrectFlashCard = (value) => {
    if (correctAnswerFlashcard) {
      const index = correctAnswerFlashcard.findIndex(
        (item) => item.vocabId === value.vocabId && item.defId === value.defId
      );
      if (index === -1) {
        setCorrectAnswerFlashcard([...correctAnswerFlashcard, value]);
      }
    } else setCorrectAnswerFlashcard([...correctAnswerFlashcard, value]);
  };
  const handleIncorrectAnswer = (item) => {
    setIncorrectAnswer([...incorrectAnswer, item]);
  };
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

      default:
        break;
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
        max: 767,
        min: 0,
      },
      items: 1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 767,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  const handleAddVocabToLeitner = async () => {
    if (incorrectAnswer) {
      try {
        const data = incorrectAnswer.map((item) => {
          return {
            vocabId: item.vocabId,
            defId: item.defId,
          };
        });
        const rs = await addVocabToLeitner(data);
        openNotificationWithIcon("success", rs);
      } catch (error) {
        openNotificationWithIcon("error", "Fail to add!");
      }
    }
  };
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
                handleChangeSlide={handleChangeSlide}
                handleCorrectFlashCard={handleCorrectFlashCard}
                handleIncorrectAnswer={handleIncorrectAnswer}
              />
            ))}
            <SuccessCard
              type={"success-review"}
              onSelect={current === result.length}
              handleChangeLesson={handleChangeLesson}
              handleAddVocabToLeitner={handleAddVocabToLeitner}
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
            {result.map((item, index) => (
              <FlashCard
                key={index}
                onSelect={current === index}
                handleChangeSlide={handleChangeSlide}
                vocabInfo={item}
                handleCorrectFlashCard={handleCorrectFlashCard}
                handleIncorrectAnswer={handleIncorrectAnswer}
              />
            ))}
            <SuccessCard
              type={"success-flash_card"}
              onSelect={current === result.length}
              correctAnswerFlashcard={correctAnswerFlashcard}
              resultLength={result.length}
              handleChangeLesson={handleChangeLesson}
              incorrectAnswer={incorrectAnswer}
              handleAddVocabToLeitner={handleAddVocabToLeitner}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
      case SPELLING:
        return (
          <Carousel
            arrows={false}
            showDots={false}
            responsive={responsive}
            draggable={false}
            slidesToSlide={1}
            swipeable={false}
            ssr={false}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
            ref={slide}
          >
            <ReviewCard type={"default"} />
            {result.map((item, index) => (
              <SpellingCard
                indexKey={index}
                key={index}
                onSelect={current === index}
                handleCorrectFlashCard={handleCorrectFlashCard}
                handleIncorrectAnswer={handleIncorrectAnswer}
                handleChangeSlide={handleChangeSlide}
                vocabInfo={item}
              />
            ))}
            <SuccessCard
              type={"success-spelling"}
              onSelect={current === result.length}
              correctAnswerFlashcard={correctAnswerFlashcard}
              resultLength={result.length}
              handleChangeLesson={handleChangeLesson}
              incorrectAnswer={incorrectAnswer}
              handleAddVocabToLeitner={handleAddVocabToLeitner}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
      case QUIZ:
        return (
          <Carousel
            arrows={false}
            showDots={false}
            responsive={responsive}
            draggable={false}
            slidesToSlide={1}
            swipeable={false}
            ssr={false}
            ref={slide}
            afterChange={(nextSlide, { currentSlide, onMove }) => {
              setCurrent(currentSlide);
            }}
          >
            <ReviewCard type={"default"} />
            {result.map((item, index) => (
              <QuizCard
                key={index}
                onSelect={current === index}
                handleCorrectFlashCard={handleCorrectFlashCard}
                handleChangeSlide={handleChangeSlide}
                handleIncorrectAnswer={handleIncorrectAnswer}
                vocabInfo={item}
              />
            ))}
            <SuccessCard
              type={"success-quiz"}
              onSelect={current === result.length}
              correctAnswerFlashcard={correctAnswerFlashcard}
              resultLength={result.length}
              handleChangeLesson={handleChangeLesson}
              incorrectAnswer={incorrectAnswer}
              handleAddVocabToLeitner={handleAddVocabToLeitner}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
      case OVERVIEW:
        return <Overview />;
      default:
        return (
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
                handleChangeSlide={handleChangeSlide}
                vocabInfo={item}
              />
            ))}
            <SuccessCard
              type={"success-review"}
              onSelect={current === result.length}
              handleChangeLesson={handleChangeLesson}
              resultLength={result.length}
              handleAddVocabToLeitner={handleAddVocabToLeitner}
            />
            <ReviewCard type={"default"} />
          </Carousel>
        );
    }
  };
  return (
    <Space className="game game-wrap" direction="vertical">
      {contextHolderMsg}
      {loading ? (
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
      ) : (
        renderCard()
      )}

      {modalCtx}
      {type !== OVERVIEW && (
        <GameMenu
          onChangeLesson={handleChangeLesson}
          lesson={type}
          handleExit={handleExit}
        />
      )}
    </Space>
  );
};

export default Game;
