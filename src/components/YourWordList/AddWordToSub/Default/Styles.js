import { StyleSheet } from "react-native";
import { colors, spacing, sizes, shadow } from '~/constants/theme';
export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    Seach: {
        width: '100%',
        height: 75,
        borderBottomWidth: 2,
        display: 'flex',
        alignItems: 'center',
        borderBottomColor: '#ccc',
    },
    field: {

        paddingLeft: spacing.xl + spacing.s,
        paddingRight: spacing.m,
        borderRadius: sizes.radius,
        width: "92%",
        flex: 1,
        ...shadow.light,

    },
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    searchView: {
        marginTop: 15,
        backgroundColor: "#fff",
        height: 45,
        width: "85%",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    iconClear: {
        position: 'absolute',
        top: 10,
        right: 13,
        zIndex: 1,
    },
    content: {
        flex: 1,
    },
    viewImage: {
        width: "100%",
        height: "80%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        fontSize: 18,
        // fontWeight: '100',
        color: colors.textTitle,
        marginLeft: 30,
        // fontFamily: 'QuicksandBold'
    },
    viewButtonReturn: {
        backgroundColor: '#2C94E6',
        position: 'absolute',
        borderRadius: 20,
        right: 20,
        bottom: 20
    },
    buttonReturn: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        padding: 8



    },
    viewLoaderSearch: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
    itemLoader: {
        borderBottomColor: "#F1F1F1",
        borderBottomWidth: 2
    }

})