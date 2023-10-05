import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const styles = StyleSheet.create({
   result: {
      height: 102,
      backgroundColor: '#FEFEFE',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#F1F1F1',
      borderBottomWidth: 3
   },
   imageVocal: {
      width: 75,
      height: 75,
      borderRadius: 10,
      marginLeft: 20
   },
   content: {
      width: 250,
      height: 75,
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   content_top: {
      width: '100%',
      height: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   content_top_Vocal: {
      fontSize: 17,
      color: colors.textColor,
      letterSpacing :0.5
   },
   content_top_Type: {
      fontSize: 14,
      backgroundColor: '#B4B7E0',
      height: 20,
      borderRadius: 10,
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      letterSpacing :0.5
   },
   content_bottom: {
      width: '100%',
      height: 45
   },
   content_bottom_Mean: {
      color: colors.textColor,
      letterSpacing :0.5,
      fontSize: 15,
      lineHeight: 22
   }

})
