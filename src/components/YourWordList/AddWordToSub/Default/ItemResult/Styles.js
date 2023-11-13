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
   viewPos: {
      borderRadius: 10,
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomStartRadius: 10,
      height: 20,
      paddingHorizontal: 10,
   },
   content_top_Type: {
      fontSize: 14,
      color: 'white',
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
      color: 'rgb(161 161 170)',
      letterSpacing: 0.1,
      fontSize: 15,
      lineHeight: 24
   },
   viewIcon: {
      borderRadius: 15,
      borderColor: '#ccc',
      borderWidth: 2,
      width: 20,
      height: 20,
   },

})
