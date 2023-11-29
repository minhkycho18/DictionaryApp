import React, { useEffect, useState } from "react";
import "./LeitnerGame.scss";
import {
  getAllVocabInALevel,
  getLeiner,
} from "../../../api/Leitner/leitner.api";
import { useLoaderData, useParams } from "react-router-dom";
const LeitnerGame = (props) => {
  const loader = useLoaderData();
  const [vocabs, setVocabs] = useState();
  const { id } = useParams();
  useEffect(() => {
    const _getAllVocab = async () => {
      const result = await getAllVocabInALevel(+loader.data.level);
      if (result) {
        setVocabs(result);
      }
    };
    _getAllVocab();
    return () => {};
  }, [loader.data.level]);
  console.log(vocabs);
  return <div>LeitnerGame</div>;
};

export default LeitnerGame;
