import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        // flex: 1,
        // zIndex: -1,
        marginBottom: 0,
        // borderBottomLeftRadius: 20,

        elevation: 0,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,

    },
    wrappered: {
        paddingTop: 15,
        paddingRight: 20,
        paddingBottom: 25,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginTop: 2,

        backgroundColor: "#FAFAFA",
    },
    Text_content: {
        marginLeft: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: "75%",
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    word:{
        color: "#182B40",
        fontFamily: "Quicksand-SemiBold",
        fontSize: 18,
        letterSpacing: 0.2,
    },
    definition:{
        fontFamily: "Quicksand-Medium",
        fontSize: 15,
        letterSpacing: 0.2,
    },

    Title_Status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        // borderStyle: 'solid',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        alignItems: "center",
    },

})