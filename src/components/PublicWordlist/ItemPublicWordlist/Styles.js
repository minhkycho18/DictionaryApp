import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        // paddingTop: 40,
        // marginBottom: 10,
        // backgroundColor: "red",
        justifyContent: 'center',
        paddingTop: 52,
        marginBottom: 5


    },
    wrappered: {
        padding: 15,
        borderRadius: 20,
        height: 135,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        paddingTop: 5,
        backgroundColor: '#FEFEFE'


    },
    viewLeft: {
        width: "28%",
        // backgroundColor: 'red',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 10
    },
    viewRight: {
        marginLeft: 10,
        width: "65%",
        marginTop: 1,
        // backgroundColor:'red',
        paddingRight: 15

    },
    viewImage: {
        width: 97,
        height: 130,
        backgroundColor: '#fff',
        borderLeftWidth: 5,
        borderLeftColor: "#BFD8C3",
        position: 'absolute',
        top: -29,
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