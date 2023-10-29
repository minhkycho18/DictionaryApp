import { StyleSheet } from "react-native";
import { colors } from '~/constants/theme'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  wrappered: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 20,
    borderLeftWidth: 8
  },
  phonetic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  phoneticWord: {
    flex: 1,
  },
  soundIcon: {
    marginLeft: 8,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  languageFlag: {
    width: 28,
    height: 28,
    marginRight: 15,
  },
  phoneticContent: {
    fontSize: 18,
    color: colors.textColor
  },
  phoneticType: {
    fontSize: 18,
  },

});