import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
        zIndex: -1,
        marginBottom: 10,
        // backgroundColor: 'red'


    },
    wrappered: {
        padding: 20,
        // borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',


    },
    Image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    Text_content: {
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: "62%",
        height: "90%",
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
        backgroundColor: "#E51400",
        width: 50,
        height: "100%",
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    wrappered_open_swipe_left: {
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        width: "85%",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    wrappered_close: {
        // borderBottomLeftRadius: 20,
        // borderTopLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // borderTopRightRadius: 20,
        // width: "100%",
        marginLeft: "0%"


    },
    modal_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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

    edit: {
        backgroundColor: "#007ACC",
        width: 50,
        height: "100%",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    wrappered_open_swipe_right: {
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        // width: "85%",
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    viewBottomSheet: {
        marginHorizontal: 20,
    },
    modal: {
        justifyContent: "center",
        margin: 15,
    },
    modalContent: {
        backgroundColor: "white",
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 12,
        // borderTopRightRadius: 50,
        // borderTopLeftRadius: 50,
        borderRadius: 50
        // height: "50%",
    },
    wrappered_right: {
        padding: 20,
        // borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        marginLeft: "15%"

    },
    item: {
        borderRadius: 20,
        display: 'flex',
        // flexDirection: 'row',
        // alignItems: 'center',
        // position: 'relative',
        // backgroundColor: 'red',
        overflow: 'hidden',
        // zIndex:100
        
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
      }      
      
      
      
      
      
})