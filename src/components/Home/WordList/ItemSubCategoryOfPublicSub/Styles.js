import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    wrappered: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        width: "100%",
    },
    buttonClone: {
        position: "absolute",
        top: 25,
        right: '13%',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 1.5,
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        borderColor: "#2959a2"
        // transform: [{ translateY: -50 }],
    },
    imageClone: {
        width: 20,
        height: 20,
        tintColor: '#2959a2'
    }
})