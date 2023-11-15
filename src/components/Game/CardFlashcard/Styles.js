import { StyleSheet } from "react-native";
import { colorPos, colors } from "~/constants/theme";

export const Styles = StyleSheet.create({
    top: {
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    card: {
        // marginLeft: '5%',
        width: '98%',
        height: '100%',
        // backgroundColor:'red'
        display:'flex'
    },
    cardFace: {
        // marginLeft:5,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    cardBack: {
        // alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    content: {
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // backgroundColor: 'red',
        marginTop: '40%',
    },
    word: {
        fontSize: 32,
        color: colors.textTitle
    },
    viewExample: {
        marginTop: 10,
        width: '90%',
        alignItems: 'center',
    },
    viewSyn: {
        marginTop: 10,
        width: '90%',
        display: "flex",
        flexDirection: "column",
    },
    viewPos: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginTop: 6,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:40
    },
    Pos: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
    },
    example: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        // alignItems: 'center',
        // justifyContent: 'space-around',
    },
    type: {
        marginTop: 12,
        alignItems: 'center',
        borderRadius:40,
        backgroundColor: "#B4B6E6",



    },
    textType: {
        paddingHorizontal: 15,
        paddingBottom: 2,
        borderRadius: 20,
        // backgroundColor: "#B4B6E6",
        color: '#fff',
        
    },
    viewdef: {
        marginTop: 20,
        width: '90%',
    },
    textDef: {
        fontSize: 16,
        letterSpacing: 0.15,
        color: colors.textColor,
        lineHeight: 22
    },
    bottom: {
        width: "100%",
        // backgroundColor: "red",
        // height: 50,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
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
    synonym: {
        width: "90%",
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    synonym_main: {
        fontSize: 16,
        letterSpacing: 0.2,
        color: '#5E7172',

    },
    synonym_Item: {
        backgroundColor: "#CFE5DE",
        width: 'auto',
        height: 'auto',
        paddingBottom: 3,
        paddingTop: 3,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15,
        marginLeft: 10,
        marginBottom: 5,


    },
    synonym_Item__Text: {
        color: "#467A4D",
        textAlign: 'center'
    },
    viewSound: {
        width: 45,
        height: 45,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#00BFA5',
        position: 'absolute',
        backgroundColor: '#fff',
        top: 25
    },
    ConfirmButton: {
        width: '100%',
        height: '13%',
        backgroundColor: '#FFFFFF',
        position: "absolute",
        bottom: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        display: 'flex',
        // borderTopWidth: 2,
        // borderTopColor: "#BFD8C3",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',

        shadowColor: "#aaa",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 4,

    },
    Incorrect: {
        width: '50%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 30,
        borderTopWidth: 2,
        borderTopColor: "#F50057",
        borderRightWidth: 1,
        borderRightColor: "#F2F2F2",
        alignItems: 'center',
        // marginRight:'0.5%',

    },
    Correct: {
        width: '50%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderBottomRightRadius: 30,
        borderTopWidth: 2,
        borderTopColor: "#5C995C",
        borderLeftWidth: 1,
        borderLeftColor: "#F2F2F2",
        alignItems: 'center',
    },
    circle: {
        width: 35,
        height: 35,
        borderWidth: 2,
        borderColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        top:'-25%'
    },
    back: {
        width: '20%',
        height: '7.5%',
        backgroundColor: '#4CC1B0',
        position: "absolute",
        bottom: '17%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        shadowColor: "#aaa",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 4,
    }


})