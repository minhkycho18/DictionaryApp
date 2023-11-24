import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import FlipCard from "react-native-flip-card";
import { Styles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "~/constants/theme";
import { TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function ItemCardSpelling(
  { onNextSlider, vocal, onUpdateResult },
  props
) {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(vocal.word);
  const [answer, setAnswer] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInput, setUserInput] = useState(Array(question.length).fill(""));
  const [isHint, setIsHint] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [count, setCount] = useState(0);
  const inputRefs = useRef([]);
  const hintRef = useRef();
  const confirmRef = useRef();
  const handleInputChange = (index, text) => {
    const newUserInput = [...userInput];
    newUserInput[index] = text;
    setUserInput(newUserInput);

    if (text !== "" && index < question.length - 1) {
      inputRefs.current[index].setNativeProps({
        style: Styles.focusedInput,
      });
      inputRefs.current[index + 1].focus();
    }
    if (text !== "" && index === question.length - 1) {
      inputRefs.current[index].setNativeProps({
        style: Styles.focusedInput,
      });
    }
  };
  const handleKeyPress = (index, { nativeEvent }) => {
    const isBackspace = nativeEvent.key === "Backspace";
    const isTextInputEmpty = userInput[index] === "";

    if (isBackspace && isTextInputEmpty && index > 0) {
      inputRefs.current[index].setNativeProps({
        style: Styles.unfocusedInput,
      });
      inputRefs.current[index - 1].focus();
    }
  };
  const handleConfirm = () => {
    setIsConfirm(!isConfirm);
    confirmRef.current.setNativeProps({
      style: Styles.disable,
    });
    if (isHint) {
      const answer = userInput.join("").toLowerCase();
      setAnswer(answer);
      if (answer === question) {
        setIsSuccess(true);
        onUpdateResult({
          vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
          answer: true,
        });
      } else {
        onUpdateResult({
          vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
          answer: false,
        });
      }
    } else {
      const answer = input.toLowerCase();
      if (answer === question) {
        setIsSuccess(true);
        onUpdateResult({
          vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
          answer: true,
        });
      } else {
        onUpdateResult({
          vocal: { vocabId: vocal.vocabId, defId: vocal.defId },
          answer: false,
        });
      }
      setAnswer(answer);
    }
  };

  return (
    <View style={Styles.cardFace}>
      <Image
        source={require("~/assets/wave.png")}
        style={{
          width: "100%",
          height: "60%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          tintColor: "#4DB5AA",
        }}
      />

      <View style={Styles.viewdef}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Quicksand-Bold",
            fontSize: 18,
            color: "#fff",
          }}
        >
          Spell it
        </Text>
        <Text
          numberOfLines={6}
          style={{
            ...Styles.textDef,
            fontFamily: "Quicksand-SemiBold",
            textAlign: "center",
          }}
        >
          {vocal?.wordDesc}
        </Text>
      </View>
      <View style={Styles.yourAnswer}>
        {!isConfirm ? (
          <Text style={{ fontSize: 20, fontFamily: "Quicksand-SemiBold" }}>
            Your answer
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Quicksand-SemiBold",
              color: isSuccess ? "#0F870F" : "red",
            }}
          >
            {question}
          </Text>
        )}
      </View>
      <View style={Styles.content}>
        {isHint ? (
          <View style={Styles.hintInput}>
            {question.split("").map((char, index) => (
              <TextInput
                key={index}
                style={{ ...Styles.input, fontFamily: "Quicksand-Bold" }}
                value={userInput[index]}
                onChangeText={(text) => handleInputChange(index, text)}
                maxLength={1}
                selectionColor={"#fff"}
                ref={(input) => (inputRefs.current[index] = input)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(index, { nativeEvent })
                }
              />
            ))}
          </View>
        ) : (
          <View style={Styles.searchView}>
            <TextInput
              style={{
                ...Styles.field,
                fontSize: 15,
                fontFamily: "Quicksand-SemiBold",
              }}
              value={input}
              onChangeText={setInput}
            />
          </View>
        )}

        <View style={Styles.button}>
          {!isConfirm && (
            <TouchableOpacity
              ref={hintRef}
              style={Styles.hint}
              disabled={isHint}
              onPress={() => {
                setIsHint(true);
                hintRef.current.setNativeProps({
                  style: Styles.disable,
                });
              }}
            >
              <Text
                style={{
                  fontFamily: "Quicksand-Bold",
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                Hint
              </Text>
              <FontAwesome5 name="lightbulb" size={24} color="#FFDD3E" />
            </TouchableOpacity>
          )}
          {isConfirm && (
            <TouchableOpacity style={Styles.confirm} onPress={onNextSlider}>
              <Text
                style={{
                  fontFamily: "Quicksand-Bold",
                  fontSize: 18,
                  color: "#fff",
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                next
              </Text>
              <Entypo
                name="chevron-right"
                size={22}
                color="#fff"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={Styles.next}
            ref={confirmRef}
            onPress={handleConfirm}
            disabled={isConfirm}
          >
            <Text
              style={{
                fontFamily: "Quicksand-Bold",
                fontSize: 18,
                color: "#fff",
              }}
            >
              confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
