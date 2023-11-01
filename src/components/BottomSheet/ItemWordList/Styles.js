import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    wrappered: {
        height: 50,
        marginBottom: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: "red",

    },
    Text_content: {
        marginLeft: 10,
        flex: 1,
    },
    dropDownPicker: {
        backgroundColor: "#fff",
        borderWidth: 0,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 2,

    },
    dropDownContainerStyle: {
        backgroundColor: "#1ead31",
        height: 0,
        borderWidth: 0,
    },
    arrowIconStyle: {
        width: 22,
        height: 22,
    },
    viewAdd: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginTop: 2,
        backgroundColor: "#FEFEFE",
        borderRadius: 8,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    Title_Add: {
        paddingLeft: 20
    },
    Image: {
        width: 30,
        height: 30
    },


})