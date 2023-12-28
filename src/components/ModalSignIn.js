import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import { useFonts } from "expo-font";
import {
    colors,
    configFont,
} from "~/constants/theme";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { delay } from '~/helper';
export default function ModalSignIn({ isOpenModal, content }) {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigation()
    useEffect(() => {

        if (content !== "") {
            setIsOpen(true)
        }
    }, [content, isOpenModal])


    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
    return (
        <Modal
            onBackdropPress={() => {
                setIsOpen(false);
            }}
            onBackButtonPress={() => setIsOpen(false)}
            isVisible={isOpen}
            animationIn="bounceInUp"
            animationOut="bounceOutDown"
            animationInTiming={900}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={500}
            useNativeDriver={true}
            style={{ ...Styles.modal, zIndex: 1000 }}
            onModalShow={() => { }}
        >
            <View style={Styles.modalContent}>
                <View style={Styles.viewBottomSheet}>
                    <Text
                        style={Styles.header}
                    >
                        Sign in to continue
                    </Text>
                    <Text style={Styles.textContent}>
                        in oder to {content} you need to sign in
                    </Text>
                    <TouchableOpacity
                        onPress={async () => {
                            setIsOpen(false);
                            await delay(500)
                            navigation.push("Authenticate")
                        }}
                        style={Styles.button}>
                        <Text style={Styles.textButton}>Sign in</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const Styles = StyleSheet.create({
    viewBottomSheet: {
        marginHorizontal: 20,
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: "white",
        paddingTop: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        height: "30%",
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,

    },
    header: {
        fontFamily: "Quicksand-Bold",
        fontSize: 25,
        color: colors.textTitle,
    },
    textContent: {
        marginTop: 10,
        fontFamily: "Quicksand-SemiBold",
        fontSize: 17,
        color: colors.textColor,
        textAlign: 'center'
    },
    textButton: {
        fontFamily: "Quicksand-SemiBold",
        fontSize: 20,
        color: '#fff',
    },
    button: {
        marginTop: '10%',
        width: '100%',
        backgroundColor: '#3081D0',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
})
