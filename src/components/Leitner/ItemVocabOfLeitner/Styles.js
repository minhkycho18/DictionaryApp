import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 10,


    },
    wrappered: {
        borderLeftWidth: 7,
        borderLeftColor: "#56BAF9",
        alignItems: 'center',
        width: "100%",
        height: 100,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    Text_content: {
        marginLeft: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        // height: "50%",
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    Title_Status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        // borderStyle: 'solid',
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        alignItems: "center",
        // backgroundColor:'yellow'
    },
})