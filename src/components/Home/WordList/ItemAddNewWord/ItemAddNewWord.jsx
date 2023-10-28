import React, { useRef } from "react";
import { View } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { Text } from "react-native";
import tw from "twrnc";
import { svgreview } from "~/constants/theme";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
export default function ItemAddNewWord() {
    const wrapRef = useRef();
    const handleAddnewWord = async () => {
        // navigation.push("YourWordlistDetail");
        console.log("test: ","click item");
      };
    return (
        <TouchableOpacity onPress={handleAddnewWord}>
            <View style={[tw`bg-stone-100`, Styles.wrappered]} ref={wrapRef}>
                <Image
                    source={require("~/assets/btn_add.png")}
                    style={Styles.Image}
                ></Image>
                <View style={Styles.Title_Add}>
                    <Text
                        numberOfLines={1}
                        style={[tw`tracking-wide text-lg`, { color: "#182B40" }]}
                    >
                        Add a new word
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
