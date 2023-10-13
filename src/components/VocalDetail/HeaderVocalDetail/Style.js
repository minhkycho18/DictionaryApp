import { StyleSheet } from "react-native";
import { colors, spacing, sizes, shadow } from '../../../constants/theme';
export const styles = StyleSheet.create({
  headerSearch: {
    display: 'flex',
    height: 70,
    width: '100%',
    backgroundColor: '#7E68EF',
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
  textHeader: {
    fontSize: 30,
    color: "#fff",
    fontStyle: 'italic',
    fontWeight: 'bold',
    letterSpacing: 0.6
  },
  pronunText: {
    fontSize: 18,
    letterSpacing: 0.6,
    color: '#fff',
    fontStyle: "italic",
    marginRight: 5,


  },
});