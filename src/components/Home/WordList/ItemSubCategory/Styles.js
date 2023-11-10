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
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 7,
        position: "relative",
    },
    modal_view_button: {
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row",
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
    },
    modal_button_cancel: {
        width: 70,
        height: 35,
        backgroundColor: "green",
        textAlign: "center",
        padding: 5,
        display: "flex",
        alignItems: "center",
        borderRadius: 10,
        marginRight: 20,
    },
    modal_button_delete: {
        width: 70,
        height: 35,
        backgroundColor: "red",
        textAlign: "center",
        padding: 5,
        display: "flex",
        alignItems: "center",
        borderRadius: 10,
    },
})