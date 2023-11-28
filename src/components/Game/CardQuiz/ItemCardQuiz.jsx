import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors, incorrect_correct_back } from "~/constants/theme";
import { SvgXml } from "react-native-svg";
import { Audio } from "expo-av";
import { FlatList } from "react-native";
export default function ItemCardQuiz({ onNextSlider, vocal, onUpdateResult }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checkChoice, setCheckChoice]= useState(false);
  const resultEntries = Object.entries(vocal.result);
  const confirmRef = useRef();
  const answers = [
    { id: 1, text: resultEntries[0][0], check: resultEntries[0][1] },
    { id: 2, text: resultEntries[1][0], check: resultEntries[1][1] },
    { id: 3, text: resultEntries[2][0], check: resultEntries[2][1] },
    { id: 4, text: resultEntries[3][0], check: resultEntries[3][1] },
  ];
  const Ans = answers.find(item => item.check === true);

  const test = () => {
    answers.map((answer) => ({
      ...answer,
      text: result[answer.text]
    }));
  }
  // const data 
  const [data, setdData] = useState(vocal.result);

  const handleAnswerPress = (text) => {
    setSelectedAnswer(text);
    setCheckChoice(true);
    confirmRef.current.setNativeProps({
      style: Styles.btnDone,
          // disabled:false

    });

  };
  const Slider  = ()  => {
    
  } 
  const hanleClickDone = () => {
    // console.log('\n\nanswer : ',answers);
    // console.log('\n\n 1 answer true  : ',Ans);

    // console.log('\nYou have choiced answer : ',selectedAnswer);
    // console.log(`Answer :: ${selectedAnswer}   Result :: ${Ans.text}`);
    if (selectedAnswer === Ans.text) {
      onNextSlider({
        vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
        answer: true,
      });
    } else {
      onNextSlider({
        vocal: { answer:Ans.text, question: vocal.question, choose: selectedAnswer  },
        answer: false,
      });
    }

  }
  useEffect(() => {
    // console.log('T: \n\n',answers);
  }, []);
  return (
    <View style={Styles.cardFace}>
      <View style={Styles.viewquestion}>
        <Text
          style={Styles.labelTitle}
        >
          Choose the right answer
        </Text>

        <Text
          style={Styles.textQuestion}
        >
          {/* "user when we want to politely ask for something or politely tell a person to do something" */}
          "{vocal.question}"
        </Text>
      </View>

      <View
        style={Styles.viewanswer}
      >
        <View style={Styles.listanswer}>
          {answers.map((answer) => (
            <TouchableOpacity
              key={answer.id}
              onPress={() => handleAnswerPress(answer.text)}
              style={[Styles.answer, {
                borderColor: selectedAnswer === answer.text ? '#2395F1' : '#ccc',
                backgroundColor: selectedAnswer === answer.text ? '#F1F7FC' : '#fff',
              }]}
            >
              <Text style={Styles.textanswer} >{answer.text}</Text>
            </TouchableOpacity>
          ))}

        </View>
        <TouchableOpacity
          style={[Styles.btnDone,Styles.disable]}
          ref={confirmRef}
          onPress={() => hanleClickDone()}
          disabled={!checkChoice}

        >
          <Text
            style={{
              fontFamily: "Quicksand-Bold",
              fontSize: 17,
              color: "#fff",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
