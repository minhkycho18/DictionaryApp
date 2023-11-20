import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors, incorrect_correct_back } from "~/constants/theme";
import { SvgXml } from "react-native-svg";
import { Audio } from "expo-av";
import { FlatList } from "react-native";
export default function ItemCardQuiz({ onNextSlider, vocal }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answers = [
    { id: 1, text: 'Sorry' },
    { id: 2, text: 'OK' },
    { id: 3, text: 'Good morning' },
    { id: 4, text: 'Good night' },
  ];

  const handleAnswerPress = (id) => {
    setSelectedAnswer(id);
    // console.log(selectedAnswer);
  };

  useEffect(() => {
    // console.log('\n\n\ntest: ', vocal)
  }, []);
  return (
    <View style={Styles.cardFace}>
      <View style={Styles.viewquestion}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Quicksand-Bold",
            fontSize: 18,
            color: "#fff",
            marginTop: '10%',
          }}
        >
          Choose the right answer
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontFamily: "Quicksand-Bold",
            fontSize: 17,
            color: "#fff",
            marginTop: '5%',
            width: '85%'
          }}
        >
          "user when we want to politely ask for something or politely tell a person to do something"
        </Text>
      </View>

      <View
        style={Styles.viewanswer}
      >
        <View style={Styles.listanswer}>
          {answers.map((answer) => (
            <TouchableOpacity
              key={answer.id}
              onPress={() => handleAnswerPress(answer.id)}
              style={[Styles.answer, {
                borderColor: selectedAnswer === answer.id ? '#2395F1' : '#ccc',
                backgroundColor: selectedAnswer === answer.id ? '#F1F7FC' : '#fff',
              }]}
            >
              <Text style={Styles.textanswer} >{answer.text}</Text>
            </TouchableOpacity>
          ))}

        </View>
        <TouchableOpacity
          style={Styles.btnDone}
          onPress={onNextSlider}
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
