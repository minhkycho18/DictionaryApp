import React, { useRef } from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import {SvgXml } from "react-native-svg";
import { Text } from "react-native";
import tw from "twrnc";
import { svgreview } from "~/constants/theme";
export default function ItemListVocabOfSub() {
  const wrapRef = useRef();
  const data = [
    {
      id: 1,
      title: "wordlist1",
      listDesc: "wordlist1",
      createdBy: "learner1",
      listType: "PUBLIC",
      createdAt: "10-10-2023",
    },
    {
      id: 2,
      title: "wordlist2",
      listDesc: "wordlist2",
      createdBy: "learner1",
      listType: "PRIVATE",
      createdAt: "10-10-2023",
    },
    {
      id: 3,
      title: "wordlist1",
      listDesc: "wordlist1",
      createdBy: "learner1",
      listType: "PUBLIC",
      createdAt: "10-10-2023",
    },
    {
      id: 4,
      title: "wordlist2",
      listDesc: "wordlist2",
      createdBy: "learner1",
      listType: "PRIVATE",
      createdAt: "10-10-2023",
    },
  ];
  // setWordLists(data);
  return (
    <>
      {data.map((item) => (
        <View style={[tw`bg-stone-100`, Styles.wrappered]} ref={wrapRef}>
          <View style={Styles.Text_content}>
            <View style={Styles.Title_Status}>
              <View>
                <Text
                  numberOfLines={1}
                  style={[tw`tracking-wide text-xl italic`, { color: "#182B40" }]}
                >
                  Word {item.id}
                </Text>
              </View>

              {/* Status */}
              <View style={Styles.viewItem}>
                <View Styles={Styles.item}>
                  <View style={Styles.circle}>
                    <SvgXml width="20" height="20" xml={svgreview} />
                  </View>
                </View>

                <View Styles={Styles.item}>
                  <View style={Styles.circle}>
                    <SvgXml width="20" height="20" xml={svgreview} />
                  </View>
                </View>

                <View Styles={Styles.item}>
                  <View style={Styles.circle}>
                    <SvgXml width="20" height="20" xml={svgreview} />
                  </View>
                </View>

              </View>
            </View>

            <View>
              <Text
                style={[
                  tw`tracking-normal text-base non-italic`,
                  { color: "#182B40" },
                ]}
              >
                the word mean that you say hello word mean that you say hello
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
}
