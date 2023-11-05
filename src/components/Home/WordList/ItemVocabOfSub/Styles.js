import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
        container: {
        // flex: 1,
        // zIndex: -1,
        // marginBottom: 10,
        // borderBottomLeftRadius: 20,

        
        elevation: 4,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 4,

    },
    wrappered: {
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginTop: 2
    },
    Text_content: {
        marginLeft: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "95%",
        height: "75%",
        justifyContent: 'flex-start',
    },
    Title_Status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        // borderStyle: 'solid',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        alignItems: "center",
    },
    viewItem: {
        width: "40%",
        // backgroundColor: 'blue',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // position: 'absolute',
        // marginLeft: 20
        // top: -7,
        right: -18
    },
    item: {
        paddingRight: 100
    },
    circle: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    checkbox: {
        position: 'absolute',
        top: 45,
        left: 5,
        zIndex: 1000,
        width: 12,
        height: 12,
        borderWidth: 1
    }
})