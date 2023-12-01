import { StyleSheet } from "react-native";


export const Styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 85,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        marginBottom: 25
    },
    viewIcon: {
        width: 35,
        height: 35,
        backgroundColor: '#0b043d',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContent: {
        width: '82%',
        height: '100%',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewWords: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        width: '100%',
        // backgroundColor: 'red'
    },
    viewContentLeft: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    viewNext: {
        width: 30,
        height: 30,
        backgroundColor: "#EEECEE",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }


})