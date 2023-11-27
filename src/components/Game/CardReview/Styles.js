import { StyleSheet } from "react-native";
import { colorPos, colors } from "~/constants/theme";

export const Styles = StyleSheet.create({
    top: {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },
    card: {
        // marginLeft: '5%',
        width: '98%',
        height: '100%',
        // backgroundColor:'red',
        display: 'flex'

    },
    cardFace: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 30,
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
        borderRadius: 30,
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
        // position: 'absolute',
        // top: "35%",
        // transform: [{ translateY: -50 }],
        marginTop: '10%',

    },
    word: {
        fontSize: 32,
        color: colors.textTitle,

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
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Pos: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginBottom: '2%'
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
        alignItems: 'center',
        borderRadius: 20,
        // backgroundColor: "red",
    },
    textType: {
        paddingHorizontal: 15,
        paddingBottom: 2,
        borderRadius: 20,
        // backgroundColor: "#B4B6E6",
        color: '#fff',

    },
    viewdef: {
        width: '90%',
        marginTop: '3%'
    },
    textDef: {
        fontSize: 16,
        letterSpacing: 0.15,
        color: colors.textColor,
        lineHeight: 22
    },
    bottom: {
        width: "100%",
        // backgroundColor: "green",
        height: "25%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        position: "absolute",
        bottom: 0,
    },
    temp: {
        width: "100%",
        height: "26%",
        // backgroundColor: "red",
        zIndex: 1000
    },
    textButton: {
        fontSize: 18,
        color: '#fff',
        position: "absolute",
        bottom: 22,
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
        width: 60,
        height: 60,
        borderWidth: 5.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#4DB5AA',
        position: 'absolute',
        backgroundColor: '#fff',
        top: "7.6%"
    }


})