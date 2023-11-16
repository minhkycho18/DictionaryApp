import { StyleSheet } from "react-native";
import { colorPos, colors } from "~/constants/theme";

export const Styles = StyleSheet.create({
    top: {
        width: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

    },
    card: {
        marginLeft: '5%',
        width: '100%',
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
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: '-6%',
    },
    word: {
        fontSize: 32,
        color: colors.textTitle
    },
    viewExample: {
        marginTop: 10,
        width: '90%',
        alignItems: 'center',
    },
    viewSyn: {
        marginTop: 10,
        width: '90%',
        display: "flex",
        flexDirection: "column",
    },
    viewPos: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginTop: 20,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Pos: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
    },
    example: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        // alignItems: 'center',
        // justifyContent: 'space-around',
    },
    type: {
        marginTop: 10,
        alignItems: 'center',

    },
    textType: {
        paddingHorizontal: 15,
        paddingBottom: 2,
        borderRadius: 20,
        backgroundColor: "#B4B6E6",
        color: '#fff',

    },
    viewdef: {
        marginTop: 20,
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
        // backgroundColor: "red",
        // height: 50,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    textButton: {
        fontSize: 18,
        color: '#fff',
        position: "absolute",
        bottom: 20,
    },
    synonym: {
        width: "90%",
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    synonym_main: {
        fontSize: 16,
        letterSpacing: 0.2,
        color: '#5E7172',

    },
    synonym_Item: {
        backgroundColor: "#CFE5DE",
        width: 'auto',
        height: 'auto',
        paddingBottom: 3,
        paddingTop: 3,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        marginLeft: 10,
        marginBottom: 5,


    },
    synonym_Item__Text: {
        color: "#467A4D",
        textAlign: 'center'
    },
    viewSound: {
        width: 45,
        height: 45,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#00BFA5',
        position: 'absolute',
        backgroundColor: '#fff',
        top: 25
    }


})