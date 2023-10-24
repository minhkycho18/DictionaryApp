import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
        zIndex: -1,
        marginBottom: 10,
        borderBottomLeftRadius: 20,
    },
    wrappered: {
        padding: 20,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',


    },
    Image: {
        width: 70,
        height: 70
    },
    Text_content: {
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "62%",
        height: "75%",
        justifyContent: 'flex-start',
    },
    Icon: {

        height: "130%",
        width: 30,
        marginLeft: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Icon_delete: {
        position: "absolute",
        right: 5,
        top: 5,
        width: 30,
        height: 30,
    },
    Content_input: {
        width: 70,
        height: 50,
        position: "absolute",
        right: 0,
        top: -33,
        display: 'flex',
        flexDirection: 'row',
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
        backgroundColor: "red",
        width: 50,
        height: "100%",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    wrappered_open: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        width: "85%",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    wrappered_close: {
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
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