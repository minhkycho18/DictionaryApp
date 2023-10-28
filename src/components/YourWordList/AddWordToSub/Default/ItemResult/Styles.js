import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const styles = StyleSheet.create({
   result: {
      height: 100,
      backgroundColor: '#FEFEFE',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#F1F1F1',
      borderBottomWidth: 3,

   },
   imageVocal: {
      width: 75,
      height: 75,
      borderRadius: 10,
      marginLeft: 20
   },
   content: {
      width: '90%',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
   },
   content_top: {
      width: '100%',
      height: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   content_top_Vocal: {
      fontSize: 20,
      color: colors.textColor,
      letterSpacing: 0.2,


   },
   content_top_Type: {
      fontSize: 14,

      height: 20,
      borderRadius: 10,
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      letterSpacing: 0.5,

   },
   content_bottom: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '90%',
      height: 'auto',
      // paddingTop: 6,
   },
   content_bottom_Mean: {
      color: colors.textColor,
      letterSpacing: 0.1,
      fontSize: 16,
      lineHeight: 24
   },
   viewIcon: {
      borderRadius: 30,
      borderColor: '#ccc',
      borderWidth: 2,
      width: 25,
      height: 25,
   },

})
