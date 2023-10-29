import React, { useState } from 'react'
import { Styles } from "./Styles";
import * as DocumentPicker from 'expo-document-picker';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity

} from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function FieldNoRequired() {
    const [fileResponse, setFileResponse] = useState([]);
    const [loaded] = useFonts(configFont);
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
            <View>
                <Text
                    style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                >
                    Part of speech
                </Text>
                <TextInput
                    style={{ ...Styles.input, fontFamily: "Quicksand-Regular" }}
                    placeholder="Write part of speech"


                // value={desc}
                // onChangeText={(text) => {
                //     setDesc(text);
                //     descRef.current.setNativeProps({
                //         style: Styles.remove_warning,
                //     });
                // }}
                // onFocus={handleDescFocus}
                />
            </View>
            <View style={Styles.viewPhone}>
                <View style={{ width: "36%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    >
                        PhoneUS
                    </Text>
                    <TextInput
                        style={{
                            ...Styles.input,
                            fontFamily: "Quicksand-Regular",
                        }}
                        // ref={descRef}
                        // value={desc}
                        // onChangeText={(text) => {
                        //     setDesc(text);
                        //     descRef.current.setNativeProps({
                        //         style: Styles.remove_warning,
                        //     });
                        // }}
                        // onFocus={handleDescFocus}
                        placeholder="Write here"
                    />
                </View>
                <View style={{ width: "60%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    // ref={descLabel}
                    >
                        AudioUS
                    </Text>
                    <View style={Styles.inputFile}>
                        <TouchableOpacity style={Styles.buttonFile} onPress={pickDocument}>
                            <Text style={{ fontFamily: "Quicksand-Regular", ...Styles.textFile }}>file</Text>
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
                    // ref={descLabel}
                    >
                        PhoneUk
                    </Text>
                    <TextInput
                        style={{
                            ...Styles.input,
                            fontFamily: "Quicksand-Regular",
                        }}
                        // ref={descRef}
                        // value={desc}
                        // onChangeText={(text) => {
                        //     setDesc(text);
                        //     descRef.current.setNativeProps({
                        //         style: Styles.remove_warning,
                        //     });
                        // }}
                        // onFocus={handleDescFocus}
                        placeholder="Write here"
                    />
                </View>
                <View style={{ width: "60%" }}>
                    <Text
                        style={{ ...Styles.formLabel, fontFamily: "Quicksand-SemiBold" }}
                    // ref={descLabel}
                    >
                        AudioUK
                    </Text>
                    <View style={Styles.inputFile}>
                        <TouchableOpacity style={Styles.buttonFile} onPress={pickDocument}>
                            <Text style={{ fontFamily: "Quicksand-Regular", ...Styles.textFile }}>file</Text>
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
