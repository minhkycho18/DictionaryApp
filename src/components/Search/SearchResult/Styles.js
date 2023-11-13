import { StyleSheet } from "react-native";
import { colors } from "~/constants/theme";
export const styles = StyleSheet.create({
   result: {
      height: 100,
      backgroundColor: '#FEFEFE',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#F1F1F1',
      borderBottomWidth: 3,
      paddingBottom: 10,
      paddingTop: 10,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10

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
      marginLeft: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   content_top: {
      width: '100%',
      height: 29,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   content_top_Vocal: {
      fontSize: 20,
      color: colors.textColor,
      letterSpacing: 0.2,


   },
   content_top_Type: {
      fontSize: 14,
      height: '100%',
      color: 'white',
      letterSpacing: 0.5,

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
   content_bottom: {
      width: '100%',
      height: 'auto',
   },
   content_bottom_Mean: {
      color: 'rgb(161 161 170)',
      letterSpacing: 0.1,
      fontSize: 15,
      lineHeight: 24
   }

})
