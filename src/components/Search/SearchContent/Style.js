import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    main: {
        position: 'absolute',
        bottom: 20,
        left: '10%',
    },
    searchResult: {
        position: 'absolute',
        bottom: 100,
        left: 75,

    },
    image: {
        width: 180,
        height: 180,
        tintColor: '#6b7280'

    },
    Text: {
        fontSize: 20,
        color: '#6b7280'
    },
    historySearch: {
        width: 320,
        height: 330,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    historySearch_content: {
        width: '100%',
        height: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden'
    },
    history_item: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#E1E1E1",
        height: 32,
        marginRight: 15,
        alignItems: 'center',
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 5,
        marginTop: 15

    },
    iconClose: {
        marginLeft: 6
    }
});