import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import { SvgXml } from "react-native-svg";
import { colors, svgstudy } from "~/constants/theme";

import { configFont } from "~/constants/theme";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ItemVocabOfLeitner from "~/components/Leitner/ItemVocabOfLeitner/ItemVocabOfLeitner";
import { getVocabOfLeitnerLevelOfUser } from "~/api/Leitner";

export default function LeitnerDetail(props) {
  const level = props.route.params.level;
  
  const data_mau = [
    {
      "audioUk": "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/a/att/atten/attend__gb_1.mp3",
      "audioUs": "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/att/atten/attend__us_2.mp3",
      "definition": {
        "defId": 23160,
        "examples": "I don't attend Mass.",
        "wordDesc": "to be present at "
      },
      "flashcard": false,
      "lastLearning": null,
      "phoneUk": "/əˈtend/",
      "phoneUs": "/əˈtend/",
      "pos": "verb",
      "quiz": false,
      "review": true,
      "spelling": false,
      "vocabId": 7387,
      "word": "attend"
    },
    {
      "audioUk": "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/b/bor/borde/border__gb_1.mp3",
      "audioUs": "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/b/bor/borde/border__us_1.mp3",
      "definition": {
        "defId": 12194,
        "examples": "the rug had a wide blue border",
        "wordDesc": "a strip forming the outer edge of something"
      },
      "flashcard": true,
      "lastLearning": null,
      "phoneUk": "/ˈbɔːdə(r)/",
      "phoneUs": "/ˈbɔːrdər/",
      "pos": "noun",
      "quiz": true,
      "review": false,
      "spelling": false,
      "vocabId": 10763,
      "word": "border"
    },
    {
      "audioUk": "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/b/ben/benef/benefit__gb_2.mp3",
      "audioUs": "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/b/ben/benef/benefit__us_1.mp3",
      "definition": {
        "defId": 14605,
        "examples": null,
        "wordDesc": "a performance to raise money for a charitable cause"
      },
      "flashcard": true,
      "lastLearning": null,
      "phoneUk": "/ˈbenɪfɪt/",
      "phoneUs": "/ˈbenɪfɪt/",
      "pos": "noun",
      "quiz": false,
      "review": true,
      "spelling": false,
      "vocabId": 11463,
      "word": "benefit"
    },
    {
      "audioUk": null,
      "audioUs": null,
      "definition": {
        "defId": 19323,
        "examples": null,
        "wordDesc": "deciduous low-growing perennial of Canada and eastern and central United States"
      },
      "flashcard": false,
      "lastLearning": null,
      "phoneUk": null,
      "phoneUs": null,
      "pos": "noun",
      "quiz": false,
      "review": true,
      "spelling": false,
      "vocabId": 13136,
      "word": "black snakeroot"
    },
    {
      "audioUk": "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/coa/coat_/coat__gb_2.mp3",
      "audioUs": "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/coa/coat_/coat__us_1.mp3",
      "definition": {
        "defId": 14629,
        "examples": null,
        "wordDesc": "growth of hair or wool or fur covering the body of an animal"
      },
      "flashcard": false,
      "lastLearning": null,
      "phoneUk": "/kəʊt/",
      "phoneUs": "/kəʊt/",
      "pos": "noun",
      "quiz": false,
      "review": true,
      "spelling": false,
      "vocabId": 18526,
      "word": "coat"
    },
    {
      "audioUk": "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/clo/cloak/cloak__gb_1.mp3",
      "audioUs": "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/clo/cloak/cloak__us_1.mp3",
      "definition": {
        "defId": 18258,
        "examples": null,
        "wordDesc": "to cover as if with clothing"
      },
      "flashcard": true,
      "lastLearning": null,
      "phoneUk": "/kləʊk/",
      "phoneUs": "/kləʊk/",
      "pos": "verb",
      "quiz": true,
      "review": false,
      "spelling": false,
      "vocabId": 19711,
      "word": "cloak"
    },
    {
      "audioUk": null,
      "audioUs": null,
      "definition": {
        "defId": 24951,
        "examples": null,
        "wordDesc": "the limits of the area occupied by a city or town"
      },
      "flashcard": false,
      "lastLearning": null,
      "phoneUk": null,
      "phoneUs": null,
      "pos": "noun",
      "quiz": false,
      "review": true,
      "spelling": false,
      "vocabId": 22725,
      "word": "city limits"
    },
    {
      "audioUk": "https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/c/com/commi/commissioner__gb_1.mp3",
      "audioUs": "https://www.oxfordlearnersdictionaries.com/media/english/us_pron/c/com/commi/commissioner__us_1.mp3",
      "definition": {
        "defId": 27834,
        "examples": null,
        "wordDesc": "a government administrator"
      },
      "flashcard": true,
      "lastLearning": null,
      "phoneUk": "/kəˈmɪʃənə(r)/",
      "phoneUs": "/kəˈmɪʃənər/",
      "pos": "noun",
      "quiz": true,
      "review": false,
      "spelling": false,
      "vocabId": 23117,
      "word": "commissioner"
    },
    {
      "audioUk": null,
      "audioUs": null,
      "definition": {
        "defId": 36450,
        "examples": null,
        "wordDesc": "the solid matter remaining after oil has been pressed from cottonseeds"
      },
      "flashcard": false,
      "lastLearning": null,
      "phoneUk": null,
      "phoneUs": null,
      "pos": "noun",
      "quiz": false,
      "review": true,
      "spelling": false,
      "vocabId": 25350,
      "word": "cotton cake"
    }
  ];
  const navigation = useNavigation();
  const [listVocabOfLeitner, setListVocabOfLeitner] = useState([]);


  const getVocabOfLeitnerLevel = async (level) => {
    const data = await getVocabOfLeitnerLevelOfUser(level);
    setListVocabOfLeitner(data.content);

  };
  const handleStudy = () => {
    console.log('\n\ndone nha:\n',listVocabOfLeitner);
  }

  useEffect(() => {
    getVocabOfLeitnerLevel(level);

  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ 
          // marginTop: 10, 
          marginLeft: 13, 
          // marginBottom:10,
          // backgroundColor:'red',
          // padding: 3 
          }}>
          <Entypo
            name="chevron-left"
            size={24}
            color="#182B40"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            // backgroundColor:'yellow'
            // alignItems: "center",
            // alignItems: 'center',
            // position: 'relative',
          }}
        >

          <View
          >
            {/* Title */}
            <Text
              style={[
                {
                  color: colors.textTitle,
                  fontFamily: "Quicksand-Bold",
                  fontSize: 28,
                  letterSpacing: 0.2,
                  marginTop: -10,
                },
              ]}
            >
              Leitner box Pending
            </Text>
            {/* Description */}
            {listVocabOfLeitner.length == 1 ? (<Text
              style={[
                {
                  marginTop: 10,
                  color: colors.gray,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 18,
                  letterSpacing: 0.1,
                },
              ]}
            >
              1 word
            </Text>
            ) : <Text
              style={[
                {
                  marginTop: 10,
                  color: colors.gray,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 18,
                  letterSpacing: 0.1,
                },
              ]}
            >
              {listVocabOfLeitner.length} words
            </Text>}
            {/* <Text
              style={[
                {
                  marginTop: 10,
                  color: colors.gray,
                  fontFamily: "Quicksand-SemiBold",
                  fontSize: 18,
                  letterSpacing: 0.1,
                },
              ]}
            >
              {listVocabOfLeitner.length} words
            </Text> */}
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* Button Study */}
        <TouchableOpacity
          style={styles.ButtonStudy}
        onPress={() => handleStudy()}
        >
          <SvgXml width="30" height="30" xml={svgstudy} />
          <Text
            style={[
              {
                color: "#FFF7FF",
                fontFamily: "Quicksand-SemiBold",
                marginLeft: 5,
                fontSize: 15,
              },
            ]}
          >
            Study
          </Text>
        </TouchableOpacity>

        {/* List vocab */}
        <View style={styles.dropdown}>
          <FlatList
            style={{
              // marginTop: 10,
              padding: 3,
              // marginBottom: 15,
            }}
            showsVerticalScrollIndicator={false}
            data={listVocabOfLeitner}
            keyExtractor={(item) => item.definition.defId}
            renderItem={(item) => (
              <GestureHandlerRootView>
                <ItemVocabOfLeitner Vocab={item} />
              </GestureHandlerRootView>
            )}
          />
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#F2F5FE",
  },
  header: {
    backgroundColor: "#F2F5FE",
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection:'row',
    alignItems:'center'
    // justifyContent:'center'
    // borderBottomRightRadius: 60,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FEFEFE",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  dropdown: {
    display: "flex",
    width: "88%",
    height: "100%",
    // marginTop: 12,
    // marginBottom: 12,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4,
    marginBottom: 20,
  },
  ButtonStudy: {
    backgroundColor: "#3D3A4D",
    borderRadius: 18,
    position: "absolute",
    right: "6.6%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    top: "-9.5%",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    // marginRight: 1
  },
  ButtonAdd: {
    // display: "flex",
    backgroundColor: "#D0C6EB",
    borderRadius: 25,
    position: "absolute",
    // right: 25,
    // top: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    top: "90%",
    // bottom: 20,
    right: "3.6%",
  },
  ButtonDelete: {
    // display: "flex",
    backgroundColor: "rgb(225 29 72)",
    borderRadius: 25,
    position: "absolute",
    // right: 25,
    // top: 170,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flexDirection: "row",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 15,
    paddingRight: 15,
    top: "91%",
    left: "50%",
    transform: [{ translateX: -50 }],
    textAlign: "center",
  },
  viewBottomSheet: {
    marginHorizontal: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: "77%",
  },
});
