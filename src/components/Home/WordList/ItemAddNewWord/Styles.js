import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    wrappered: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginTop: 2,
        backgroundColor: "#FEFEFE",
        elevation: 4,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 4,  
    },
    Title_Add: {
        paddingLeft: 20
    },
    Image: {
        width: 60,
        height: 60
    },
})