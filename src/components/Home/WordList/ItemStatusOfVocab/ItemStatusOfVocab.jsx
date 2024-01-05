import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Styles } from "./Styles";
import { SvgXml } from "react-native-svg";
import { colors, status_pending, status_rejected, svgStudy } from "~/constants/theme";
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

    if (Status === 'PENDING') {
        border = '#FFE58F';
        background = '#FFFBE6';
        textColor = '#FAAD14';
    }
    else if (Status === 'REJECTED') {
        border = '#FFCCC7';
        background = '#FFF2F0';
        textColor = '#FF4D4F';
    }
    else if (Status === 'PERSONAL') {
        border = '#91CAFF';
        background = '#E6F4FF';
        textColor = '#1677FF';
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
                    <View
                        style={{ marginRight: 3, marginTop: 1 }}
                    >
                        {status === 'PERSONAL' ? (
                            <Ionicons name="person-outline" size={14} color={textColor} />)
                        : status === 'REJECTED'? (
                            <SvgXml
                            style={{ right: "5%" }}
                            width="14"
                            height="14"
                            xml={status_rejected("#FF4D4F")}
                          />)
                    : status === 'PENDING'&& (
                        <SvgXml
                        style={{ right: "10%" }}
                        width="14"
                        height="14"
                        xml={status_pending("#FAAD14")}
                      />)
                    }

                    </View>
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
                        {status === 'PENDING' ? 'Pending' : status === 'REJECTED' ? 'Rejected' : status === 'PERSONAL' && 'Personal'}

                        {/* Word {item.id} */}
                    </Text>
                </View >
            )}


        </>
    );
}