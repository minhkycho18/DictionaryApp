import { StyleSheet } from "react-native"



export const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    wrapper: {
        width: "100%",
        height: 90,
        paddingVertical: 10,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
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
    viewText: {
        width: "80%",
        height: "85%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    viewIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    }
})