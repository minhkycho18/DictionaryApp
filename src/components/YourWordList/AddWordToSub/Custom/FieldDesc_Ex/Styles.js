import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const Styles = StyleSheet.create({

    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: "#182B40",
        height: 50,
        padding: 10,
        color: colors.textColor
    },
    formLabel: {
        fontSize: 16,
        color: "#07074d",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        padding: Platform.OS === 'ios' ? 12 : 8,
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
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        width: "100%",
        height: 202,
    },
    titleDesc: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }

})