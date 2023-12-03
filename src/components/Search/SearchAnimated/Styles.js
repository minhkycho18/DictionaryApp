
import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const styles = StyleSheet.create({

    borderStyle: {
        backgroundColor: '#949EE4',

        // backgroundColor: colors.primary,
        height: '100%',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        borderTopWidth: 0.5,
        alignItems: 'center',
        position: 'relative',

    },
    searchView: {
        backgroundColor: '#fff',
        width: "85%",
        padding: 10,
        position: "absolute",
        left: 31,
        bottom: -20,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        zIndex: 1000
    },
    title: {

        marginTop: 2,
        letterSpacing: 0.1,
        color: '#fff',
        fontSize: 40,
        alignItems: 'center'
    },
    boxContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 40
    },
    boxContent_item: {
        width: 145,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#BBB2E5',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'row',

    },
    img: {
        marginTop: 20,
        width: 80,
        height: 80,

    },
    text: {
        fontWeight: 'bold',
        color: '#300BAB',
        fontSize: 16
    }

})