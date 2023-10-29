import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: 'relative',
        backgroundColor: "#fff"

    },
    header: {
        width: "100%",
        height: 70,
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: "#182B40",
        height: 50,
        padding: 10,
        color: colors.textColor
    },
    inputContent: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    warning: {
        borderColor: "red",
    },
    remove_warning: {
        borderColor: "#e0e0e0"
    },
    formLabel: {
        fontSize: 16,
        color: "#07074d",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "white",
        fontWeight: "500",
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 10,
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -10,
    },

    button: {
        width: 120,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderWidth: 1,
        borderColor: "#6a64f1"
    },
    viewBotton: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    viewPhone: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    scrollView: {
        height: "100%",
        marginHorizontal: 15,
    },
    inputTitle: {
        width: "100%",
        padding: 5,
        paddingLeft: 10,
        fontWeight: "500",
        fontSize: 14,
        color: "#6b7280",
        marginTop: 15,
        borderBottomWidth: 2,
        borderBottomColor: colors.textTitle
    },
    more: {
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    inputFirstContent: {
        width: "98%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonAdd: {
        // width: 65,
        // height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#4F62F7",
        position: "absolute",
        bottom: 15,
        right: 15,
        flexDirection: 'row',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 7,
        gap: 4
    },
    viewAddCard: {
        width: "98%",
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        alignItems: 'center', paddingBottom: 10

    },
    viewAddCard_content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    Line: {
        marginTop: 5,
        borderBottomWidth: 4,
        width: 115,
        marginLeft: 10,
        borderBottomColor: "#4F62F7",
        borderRadius: 2
    },


})