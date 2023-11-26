import { StyleSheet } from "react-native";
export const Styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: 120,
        height: "auto",
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    image:
    {
        width: "100%",
        height: 136,
        borderRadius: 10,
        resizeMode: "center",
    },
    viewImage: {
        width: 121,
        height: 135,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
    }

})
