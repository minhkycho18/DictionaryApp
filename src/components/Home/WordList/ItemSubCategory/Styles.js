import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    wrappered: {
        // padding: 20,
        // borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        position: 'relative',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        width: "100%",
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,

    },
    button: {
        borderWidth: 1,
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        marginLeft: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trash: {
        backgroundColor: "#E51400",
        width: 50,
        height: "100%",
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    wrappered_open: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        width: "100%",
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
    },
    wrappered_close: {
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        width: "100%",


    },
    modal_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modal_content: {
        backgroundColor: "white",
        marginVertical: 60,
        width: "90%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 7,
        position: "relative",
    },
    modal_view_button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderTopColor: '#ccc',
    },
    modal_button_cancel: {
        width: '50%',
        height: '100%',
        textAlign: "center",
        padding: 5,
        display: "flex",
        alignItems: "center",
        borderRightWidth: 2,
        borderRightColor: '#ccc',
        paddingVertical: 10,
    },
    modal_button_delete: {
        width: '50%',
        paddingVertical: 10,
        textAlign: "center",
        padding: 5,
        display: "flex",
        alignItems: "center",

    },
    subType: {
        position: "absolute",
        top: '22%',
        right: '12%',
        zIndex: 1000,
        borderWidth: 1,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 10,

    }
})