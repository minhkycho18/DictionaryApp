import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        // paddingTop: 40,
        // marginBottom: 10,
        // backgroundColor: "red",
        justifyContent: 'center',
        paddingTop: 30,
        marginBottom: 20


    },
    wrappered: {
        padding: 15,
        borderRadius: 20,
        height: 135,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        paddingTop: 5,
        backgroundColor: '#fff'


    },
    viewLeft: {
        width: "28%",
        // backgroundColor: 'red',
        alignItems: 'center',
        position: 'relative',
    },
    viewRight: {
        width: "70%",
    },
    viewImage: {
        width: 90,
        height: 120,
        backgroundColor: '#fff',
        borderLeftWidth: 5,
        borderLeftColor: "#BFD8C3",
        position: 'absolute',
        top: -30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 4,
        borderRadius: 10

    },
    image: {
        marginTop: 10,
        width: "100%",
        height: "75%",
        paddingLeft: 10
    }

})