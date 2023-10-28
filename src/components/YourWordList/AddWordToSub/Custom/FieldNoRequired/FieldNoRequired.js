import React from 'react'
import { Styles } from "./Styles";
import {
    View,
    Text,
    TextInput,

} from "react-native";
import { useFonts } from "expo-font";
import { configFont } from "~/constants/theme";
export default function FieldNoRequired() {
    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
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
            </View>
        </View>


    )
}
