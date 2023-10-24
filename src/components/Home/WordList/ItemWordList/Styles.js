import { StyleSheet } from "react-native";
export const Styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: 120,
        height: "auto",
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    image:
    {
        width: "100%",
        height: 135,
        borderRadius: 10,
        resizeMode: "center",
    },
    viewImage: {
        width: 121,
        height: 136,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        borderRadius: 10,
    }

})
