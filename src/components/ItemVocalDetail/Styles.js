import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";
export const styles = StyleSheet.create({
    container :{
        height :"auto",
        width : "90%",
        backgroundColor :'#fff',
        marginTop :20,
        // borderTopLeftRadius :20,
        // borderTopRightRadius :20,
        borderRadius :20,
        paddingBottom :50
    },
    headerContent :{
        paddingBottom :10,
        paddingTop :10,
        borderBottomWidth :2,
        borderBottomColor :"#ccc",
        display :'flex',
        flexDirection :'row',
        justifyContent :'space-between',
        alignItems :'center',
    },
    headerText :{
        fontSize :22,
        letterSpacing :0.6,
        color :'#5E7172',
      
    },
    headerLeftContent :{
       
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
         
    },
    viewIcon :{
        
        alignItems :'center',
        justifyContent :'center',
        borderRadius : 30,
        borderColor :'#ccc',
        borderWidth :1,
        width :40,
        height :40,
    },
    definition :{
        marginTop :10,
        fontSize :18,
        letterSpacing :0.5,
        lineHeight :27,
        color :colors.textColor
    }
})