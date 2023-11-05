import React, { useState, useRef } from 'react'
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView

} from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
import DropDownPicker from "react-native-dropdown-picker";
export default function FieldNoRequired() {
    const PhoneUS = useRef();
    const PhoneUk = useRef();
    const [fileResponse, setFileResponse] = useState([]);
    const [loaded] = useFonts(configFont);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Adv', value: 'adv' },
        { label: 'Adj', value: 'adj' },
        { label: 'Noun', value: 'noun' },
        { label: 'Verb', value: 'Verb' },
    ]);
    const [open, setOpen] = useState(false);
    // const [pos, setPos] = useState(["adv", "adj", "noun"]);
    if (!loaded) {
        return null;
    }
    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Specify the allowed MIME types for audio files
            });
            // setFileResponse()
            // 
            setFileResponse(result.assets[0].name)
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
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
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
                    />
                </View>
                <View style={{ width: "60%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        Audio US
                    </Text>
                    <View style={Styles.inputFile}>
                        <TouchableOpacity style={Styles.buttonFile} onPress={pickDocument}>
                            <Text style={{ fontFamily: "Quicksand-Medium", ...Styles.textFile }}>file</Text>
                        </TouchableOpacity>
                        <View style={Styles.fileName}>
                            <Text style={Styles.textFileName}>{fileResponse}</Text>
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
                    />
                </View>
                <View style={{ width: "60%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        Audio UK
                    </Text>
                    <View style={Styles.inputFile}>
                        <TouchableOpacity style={Styles.buttonFile} onPress={pickDocument}>
                            <Text style={{ fontFamily: "Quicksand-Medium", ...Styles.textFile }}>file</Text>
                        </TouchableOpacity>
                        <View style={Styles.fileName}>
                            <Text style={Styles.textFileName}>{fileResponse}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>


    )
}
