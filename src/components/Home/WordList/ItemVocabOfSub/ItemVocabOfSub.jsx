import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import { svgreview } from "~/constants/theme";

import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function ItemVocabOfSub({ Vocab }) {

    const [word, setWord] = useState(Vocab.item.word);
    const [definition, setDefinition] = useState(Vocab.item.definition.wordDesc);
    console.log("Test word : ", word);
    console.log("Test definition : ", definition);

    const wrapRef = useRef();
    const iconRef = useRef();
    const navigation = useNavigation();
    const handleDetailWordList = async () => {
        navigation.push("YourWordlistDetail", { Wordlist: wordlist });
    };


    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
    return (
        <>
            <TouchableOpacity style={Styles.container} onPress={handleDetailWordList}>


                <View style={[tw`bg-stone-100`, Styles.wrappered]} ref={wrapRef}>
                    <View style={Styles.Text_content}>
                        <View style={Styles.Title_Status}>
                            <View>
                                <Text
                                    numberOfLines={1}
                                    style={[tw`tracking-wide text-xl italic`, { color: "#182B40" }]}
                                >
                                    {word}
                                    {/* Word {item.id} */}
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
                                {definition}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>

        </>
    );
}
