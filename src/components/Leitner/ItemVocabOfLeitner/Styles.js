import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        // flex: 1,
        // zIndex: -1,
        // marginBottom: 10,
        borderRadius: 6,
        width: "100%",
        height: 100,
        backgroundColor: "#FEFEFE",
        paddingLeft: 15,
        marginBottom: 3,
        marginTop: 15,
        backgroundColor: '#fff',
        borderLeftWidth: 7,
        borderLeftColor: "#56BAF9",
        display:'flex',
        justifyContent:'center'


    },
    wrappered: {
        // paddingTop: 15,
        paddingRight: 20,
        // paddingBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        // backgroundColor: 'red'

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