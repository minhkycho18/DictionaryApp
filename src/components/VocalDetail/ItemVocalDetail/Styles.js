import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
    },
    headerContent: {
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        letterSpacing: 0.6,
        color: '#5E7172',

    },
    headerLeftContent: {

        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",

    },
    word: {
        fontSize: 18,
        letterSpacing: 0.6,
        marginTop: 10
    },
    pos: {
        fontSize: 18,
        letterSpacing: 0.6,
        marginTop: 5,
        fontStyle: 'italic'
    },
    viewIcon: {

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#ccc',
        borderWidth: 2,
        width: 40,
        height: 40,
        marginLeft: 15
    },
    definition: {
        fontSize: 16,
        letterSpacing: 0.5,
        lineHeight: 27,
        color: colors.textColor,
    },
    wrapper: {
        borderWidth: 1,
        padding: 16,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 20,


    },
    synonym: {
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
    example: {
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 27,
        color: colors.textColor,
        marginLeft: 5
    },
    example_main: {
        fontSize: 16,
        letterSpacing: 0.2,
        color: '#5E7172',
    }
})