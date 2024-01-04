import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { colors, svgStudy } from "~/constants/theme";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { deleteWordInSub } from "~/api/Subcategory";
import { GetColor, UpperText } from "~/helper";
export default function ItemStatusOfVocab({ Status }) {
    const [status, setStatus] = useState(Status);
    var border = "#FEFEFE";
    var background = "#FEFEFE";
    var textColor = "#FEFEFE";

    if(Status ==='PENDING')
    {
        border = '#FFE58F';
        background = '#FFFBE6';
        textColor = '#FAAD14';
    }
    else if (Status === 'REJECTED')
    {
        border = '#FFCCC7';
        background = '#FFF2F0';
        textColor = '#FF4D4F';
    }

    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
    return (
        <>
            {status !== 'DEFAULT' && (
                <View
                    style={[Styles.container, { borderColor: border, backgroundColor: background }]}
                >
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                color: textColor,
                                fontFamily: "Quicksand-SemiBold",
                                fontSize: 13,
                                letterSpacing: 0.2,
                                display: 'flex',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        {status === 'PENDING' ? 'Pending': status ==='REJECTED' && 'Rejected'}

                        {/* Word {item.id} */}
                    </Text>
                </View >
            )}


        </>
    );
}