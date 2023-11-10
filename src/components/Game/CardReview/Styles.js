import { StyleSheet } from "react-native";
import { colorPos, colors } from "~/constants/theme";

export const Styles = StyleSheet.create({
    top: {
        width: "100%",
        backgroundColor: "#00BFA5",
        height: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: "center",
    },
    card: {
        width: "100%",
        height: '100%',

    },
    cardFace: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    cardBack: {
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: '12%',
    },
    word: {
        fontSize: 32,
        color: colors.textTitle
    },
    viewPos: {
        display: "flex",
        flexDirection: "column",
        width: "40%",
        marginTop: 10,
        gap: 8
    },
    Pos: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    type: {
        marginTop: 14,
        alignItems: 'center',

    },
    textType: {
        paddingHorizontal: 15,
        paddingBottom: 2,
        borderRadius: 20,
        backgroundColor: "#B4B6E6",
        color: '#fff'
    },
    viewdef: {
        marginTop: 15,
        width: '90%',
    },
    textDef: {
        fontSize: 16,
        letterSpacing: 0.15,
        color: colors.textColor,
        lineHeight: 22
    },
    bottom: {
        width: "100%",
        backgroundColor: "#00BFA5",
        height: 50,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    textButton: {
        fontSize: 18,
        color: '#fff'
    }


})