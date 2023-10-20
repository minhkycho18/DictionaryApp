import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        flexDirection: "column",
        position: 'relative',

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
        padding: 20,
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10
    },

    warning: {
        borderColor: "red",
    },
    remove_warning: {
        borderColor: "#e0e0e0"
    },
    formLabel: {
        display: "block",
        fontWeight: "500",
        fontSize: 16,
        color: "#07074d",
        marginBottom: 12,
    },
    input: {
        width: "100%",
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "white",
        fontWeight: "500",
        fontSize: 16,
        color: "#6b7280",
        resize: "none",
        marginBottom: 20,
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: -10,
    }
})