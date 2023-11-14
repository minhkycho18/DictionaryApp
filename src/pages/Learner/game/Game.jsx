import { Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocation } from "react-router-dom";
import ReviewCard from "../../../components/game/Card/ReviewCard";
import GameMenu from "../../../components/game/Menu/GameMenu";
import changeTitle from "../../../helpers/changeTitle";
import "./Game.scss";
import FlashCard from "../../../components/game/Card/FlashCard";
import QuizCard from "../../../components/game/Card/QuizCard";
import SpellingCard from "../../../components/game/Card/SpellingCard";
import SuccessCard from "../../../components/game/Card/SuccessCard";
const REVIEW = "review";
const FLASH_CARD = "flashCard";
const QUIZ = "quiz";
const SPELLING = "spelling";

const Game = (props) => {
  const { pathname } = useLocation();
  const slide = useRef();
  changeTitle(pathname);
  const [type, setType] = useState(localStorage.getItem("gameType") || REVIEW);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    localStorage.setItem("gameType", type);
    return () => {
      localStorage.removeItem("gameType");
    };
  }, [type]);

  const handleChangeLesson = (lessonType) => {
    setCurrent(0);
    setType(lessonType);
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
      // partialVisibilityGutter: 40,
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
  return (
    <Space className="game game-wrap" direction="vertical">
      {type === REVIEW && (
        <Carousel
          // arrows
          showDots
          responsive={responsive}
          slidesToSlide={1}
          ref={slide}
          afterChange={(nextSlide, { currentSlide, onMove }) => {
            setCurrent(currentSlide);
          }}
        >
          <ReviewCard type={"default"} />
          {newArr.map((item, index) => (
            <ReviewCard key={index} onSelect={current === index} />
          ))}
          <SuccessCard
            type={"success-review"}
            onSelect={current === newArr.length}
          />
          <ReviewCard type={"default"} />
        </Carousel>
      )}
      {type === FLASH_CARD && (
        <Carousel
          showDots={false}
          arrows={true}
          responsive={responsive}
          draggable={true}
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
      )}
      {type === QUIZ && (
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
      )}
      {type === SPELLING && (
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
      )}

      <GameMenu onChangeLesson={handleChangeLesson} lesson={type} />
    </Space>
  );
};

export default Game;
