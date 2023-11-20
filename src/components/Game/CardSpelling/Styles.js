import { StyleSheet } from "react-native";
import { colorPos, colors, spacing, sizes, shadow } from "~/constants/theme";

export const Styles = StyleSheet.create({
    cardFace: {
        width: '98%',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '80%',
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    viewdef: {
        marginTop: 20,
        width: '90%',
        // backgroundColor: 'red',
        position: 'absolute',
        top: -10
    },
    textDef: {
        fontSize: 16,
        letterSpacing: 0.15,
        color: '#fff',
        lineHeight: 22,
        marginTop: 10
    },
    bottom: {
        width: "100%",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: "center",
        position: "absolute",
        bottom: 0,

    },
    textButton: {
        fontSize: 18,
        color: '#fff',
        position: "absolute",
        bottom: 20,
    },

    Seach: {
        width: "100%",
        height: 64,
        display: "flex",
        alignItems: "center",
    },
    field: {
        paddingLeft: spacing.l,
        paddingRight: spacing.m,
        borderRadius: sizes.radius,
        width: "92%",
        flex: 1,
        ...shadow.light,
        paddingTop: 2
    },
    searchView: {
        backgroundColor: "rgb(241 245 249)",
        height: 45,
        width: "80%",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 10,

    },
    buttonMain: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        top: 200
    },
    hint: {
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        backgroundColor: '#A89EF8',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        left: 0

    },
    next: {
        // marginTop: -5,
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BFA5',
        paddingVertical: 8,
        borderRadius: 20,
        gap: 2,


    },
    confirm: {
        width: 100,
        backgroundColor: '#00BFA5',
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0
    },
    input: {
        margin: 5,
        width: 35,
        padding: 5,
        textAlign: 'center',
        backgroundColor: 'rgb(212 212 216)',
        borderRadius: 10,
        fontSize: 18
    },
    focusedInput: {
        backgroundColor: '#FFC95C',
        color: '#fff'
    },
    unfocusedInput: {
        backgroundColor: 'rgb(212 212 216)',
        color: '#000'
    },
    hintInput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: '90%',
        flexWrap: 'wrap'
    },
    disable: {
        backgroundColor: '#E4E6E8',
        color: '#C8CDD2'
    },
    yourAnswer: {
        position: 'absolute',
        top: '38%'
    },
    content: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "42%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
    },


}
)