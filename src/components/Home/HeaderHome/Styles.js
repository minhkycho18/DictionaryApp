import { colors } from "~/constants/theme";
import { StyleSheet } from "react-native";
export const Styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 70,
        backgroundColor: colors.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 20
    },
    headerText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "700"
    }
});
