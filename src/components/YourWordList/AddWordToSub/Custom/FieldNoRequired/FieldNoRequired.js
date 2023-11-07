import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { Audio } from 'expo-av';
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator

} from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import DropDownPicker from "react-native-dropdown-picker";
import { getAudioUpload } from '~/helper/cloudinary';
import { getAllPartOfSpeech } from '~/api/Dictionary';
export default function FieldNoRequired({ onSetFileResponseUS, onSetFileResponseUK, onSetPhoneUs, onSetPhoneUk, onSetPos, onGetFileError }) {
    const PhoneUS = useRef();
    const PhoneUk = useRef();
    const [isLoadingUs, setIsLoadingUs] = useState(false);
    const [isLoadingUk, setIsLoadingUk] = useState(false);
    const [fileResponseUS, setFileResponseUS] = useState("");
    const [fileResponseUK, setFileResponseUK] = useState("");
    const [phoneUs, setPhoneUs] = useState("");
    const [phoneUk, setPhoneUk] = useState("");
    const [pos, setPos] = useState(null);
    const [items, setItems] = useState([
        { label: 'Adv', value: 'adv' },
        { label: 'Adj', value: 'adj' },
        { label: 'Noun', value: 'noun' },
        { label: 'Verb', value: 'Verb' },
    ]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getAllPos = async () => {
            const res = await getAllPartOfSpeech();
            const customRes = res.map(item => ({ label: item, value: item }))
            setItems(customRes);
        }
        getAllPos()
    }, [])

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
            <View >
                <Text
                    style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                >
                    Part of speech
                </Text>
                <View style={{ flexDirection: 'row' }}>


                    <DropDownPicker
                        open={open}
                        value={pos}
                        items={items}
                        setOpen={setOpen}
                        setValue={(value) => {
                            onSetPos(value)
                            setPos(value)
                        }}
                        setItems={setItems}
                        style={{
                            backgroundColor: "#FEFEFE",
                            borderRadius: 10,
                            borderColor: "#e0e0e0",
                            borderWidth: 1,
                        }}
                        textStyle={{
                            color: "#6b7280",
                            fontFamily: "Quicksand-Medium",
                            fontSize: 14,
                        }}
                        placeholder="Select a part of speech "
                        placeholderStyle={{
                            color: "#6b7280",
                            fontFamily: "Quicksand-Medium",
                            fontSize: 14,
                        }}
                        showTickIcon={false}
                        dropDownContainerStyle={{
                            height: 120,
                            borderWidth: 1,
                            borderColor: "#e0e0e0",
                        }}
                        listMode="SCROLLVIEW"
                    />
                </View>

            </View>

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
                            <Text style={{ fontFamily: "Quicksand-Medium", ...Styles.textFile }}>file</Text>
                        </TouchableOpacity>
                        <View style={Styles.fileName}>
                            {!isLoadingUs ? <Text style={Styles.textFileName}>{fileResponseUS}</Text> : <ActivityIndicator size="small" color="#2C94E6" />}
                        </View>
                    </View>




                </View>
            </View>
            <View style={Styles.viewPhone}>
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
                            <Text style={{ fontFamily: "Quicksand-Medium", ...Styles.textFile }}>file</Text>
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
