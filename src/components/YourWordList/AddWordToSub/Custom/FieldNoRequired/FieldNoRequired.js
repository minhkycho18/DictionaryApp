import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { Audio } from 'expo-av';
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Platform

} from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";

import { getAudioUpload } from '~/helper/cloudinary';

export default function FieldNoRequired({ onSetFileResponseUS, onSetFileResponseUK, onSetPhoneUs, onSetPhoneUk, onSetPos, onGetFileError }) {
    const PhoneUS = useRef();
    const PhoneUk = useRef();
    const [isLoadingUs, setIsLoadingUs] = useState(false);
    const [isLoadingUk, setIsLoadingUk] = useState(false);
    const [fileResponseUS, setFileResponseUS] = useState("");
    const [fileResponseUK, setFileResponseUK] = useState("");
    const [phoneUs, setPhoneUs] = useState("");
    const [phoneUk, setPhoneUk] = useState("");




    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
    const pickDocument = async (type) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*', // Specify the allowed MIME types for audio files
            });

            // get thoi gian 
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri: result.assets[0].uri });
            const { durationMillis } = await soundObject.getStatusAsync()
            await soundObject.unloadAsync();



            if (durationMillis / 1000 < 5 && result.assets[0].size < 50000) {
                type ? setIsLoadingUs(!isLoadingUs) : setIsLoadingUk(!isLoadingUk)
                const res = await getAudioUpload({
                    uri: result.assets[0].uri,
                    type: result.assets[0].mimeType,
                    name: result.assets[0].name
                })
                type ? setIsLoadingUs(false) : setIsLoadingUk(false)

                if (type) {
                    onSetFileResponseUS(res)
                    setFileResponseUS(result.assets[0].name)
                }
                else {
                    onSetFileResponseUK(res)
                    setFileResponseUK(result.assets[0].name)
                }
            } else {
                if (durationMillis / 1000 > 5) {
                    onGetFileError("Error", "Time limit exceeded")
                }
                if (result.assets[0].size > 50000) {
                    onGetFileError("Error", "Over size")
                }
            }

        } catch (err) {
            console.error(err);
        }
    };
    return (

        <View style={Styles.inputFirstContent}>
            <View style={Styles.viewPhone}>
                <View style={{ width: "36%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        Phone US
                    </Text>
                    <TextInput
                        style={{
                            ...Styles.input,
                            fontFamily: "Quicksand-Medium",
                        }}
                        placeholder="Write here"
                        ref={PhoneUS}
                        onFocus={() => {
                            PhoneUS.current.setNativeProps({
                                borderColor: "#6a64f1",
                            })
                        }}
                        onBlur={() => {
                            PhoneUS.current.setNativeProps({
                                borderColor: "#e0e0e0",
                            })
                        }}
                        onChangeText={(text) => {
                            onSetPhoneUs(text)
                            setPhoneUs(text)
                        }}
                    />
                </View>
                <View style={{ width: "60%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        Audio US
                    </Text>
                    <View style={Styles.inputFile}>
                        <TouchableOpacity style={Styles.buttonFile} onPress={() => pickDocument(true)}>
                            <Text style={{ fontFamily: "Quicksand-Medium", ...Styles.textFile }}>File</Text>
                        </TouchableOpacity>
                        <View style={Styles.fileName}>
                            {!isLoadingUs ? <Text style={Styles.textFileName}>{fileResponseUS}</Text> : <ActivityIndicator size="small" color="#2C94E6" />}
                        </View>
                    </View>




                </View>
            </View>
            <View style={{ ...Styles.viewPhone, marginTop: 6 }}>
                <View style={{ width: "36%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        Phone Uk
                    </Text>
                    <TextInput
                        style={{
                            ...Styles.input,
                            fontFamily: "Quicksand-Medium",
                        }}
                        ref={PhoneUk}
                        placeholder="Write here"
                        onFocus={() => {
                            PhoneUk.current.setNativeProps({
                                borderColor: "#6a64f1",
                            })
                        }}
                        onBlur={() => {
                            PhoneUk.current.setNativeProps({
                                borderColor: "#e0e0e0",
                            })
                        }}
                        onChangeText={(text) => {
                            onSetPhoneUk(text)
                            setPhoneUk(text)
                        }}
                    />
                </View>
                <View style={{ width: "60%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        Audio UK
                    </Text>
                    <View style={Styles.inputFile}>
                        <TouchableOpacity style={Styles.buttonFile} onPress={() => pickDocument(false)}>
                            <Text style={{ fontFamily: "Quicksand-Medium", ...Styles.textFile }}>File</Text>
                        </TouchableOpacity>
                        <View style={Styles.fileName}>
                            {!isLoadingUk ? <Text style={Styles.textFileName}>{fileResponseUK}</Text> : <ActivityIndicator size="small" color="#2C94E6" />}
                        </View>
                    </View>
                </View>
            </View>
        </View>


    )
}
