import { StyleSheet } from "react-native";
import { colors, spacing, sizes, shadow } from '../../../constants/theme';
export const styles = StyleSheet.create({
  headerSearch: {
    display: 'flex',
    height: 70,
    width: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    width: "80%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',



  },
  pronunText: {
    fontSize: 18,
    letterSpacing: 0.6,
    color: '#fff',
    fontStyle: "italic",
    marginRight: 5,


  },
});