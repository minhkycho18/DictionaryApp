import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";

export const Styles = StyleSheet.create({
    container: {
        // flex: 1,
        // zIndex: -1,
        // marginBottom: 1,
        // borderBottomLeftRadius: 20,
        // height: 120,
        width: "100%",
        elevation: 0,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        marginBottom: 3,
        alignItems: 'center'
    },
    wrappered: {
        width: "99%",
        // height: "100%",
        // paddingTop: 10,
        // paddingRight: 20,
        // paddingBottom: 30,
        // paddingLeft: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',

        backgroundColor: "#fff",
        borderRadius: 5,

    },
    Text_content: {
        marginLeft: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        // height: "75%",
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    word: {
        color: "#56CD96",
        fontFamily: "Quicksand-Bold",
        fontSize: 16,
        letterSpacing: 0.1,
    },
    definition: {
        fontFamily: "Quicksand-Medium",
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 20
    },

    Title_Status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        // borderStyle: 'solid',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        alignItems: "center",
    },
    TextChoose: {
        color: "#FF7875",
        fontFamily: "Quicksand-Bold",
        fontSize: 16,
        letterSpacing: 0.1,

    },
    TextVocal: {
        fontFamily: "Quicksand-SemiBold",
        fontSize: 18,
        letterSpacing: 0.1,
        lineHeight: 20,
        marginBottom: 3,
        color: '#4D4C7D'
    },
    btnSeeCorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,


    },
    textBtnConrrect: {
        fontFamily: "Quicksand-SemiBold",
        fontSize: 16,
        letterSpacing: 0.1,
        lineHeight: 20,
        marginBottom: 3,
        color: '#80B3FF'
    }


})