
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

    borderStyle: {
        
        backgroundColor: "#7E68EF",
        height :'64%',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        borderTopWidth: 0.5,
        alignItems :'center'
        
    },
    searchView: {
        backgroundColor: '#fff',
        width: "85%",
        padding: 10,
        position: "absolute",
        left: 30,
        top: 265,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        
    },
    title :{
        
      marginTop :10,
      letterSpacing :0.6,
        color :'#fff',
        fontSize :34,
        fontWeight : 'bold',
        alignItems :'center'
    },
    boxContent :{
        display :"flex" , 
        flexDirection :"row" , 
        justifyContent :'space-between' ,
        width :'85%' , 
        marginTop :40
    },
    boxContent_item :{
        width :145,
        height :48,
        borderRadius :10,
        backgroundColor :'#BBB2E5',
        alignItems :'center',
        justifyContent :"center",
        flexDirection :'row',
        
    },
    img :{
        marginTop :20,
        width :80,
        height :80,
        
    },
    text :{
        fontWeight : 'bold',
        color :'#300BAB',
        fontSize :16
    }

})