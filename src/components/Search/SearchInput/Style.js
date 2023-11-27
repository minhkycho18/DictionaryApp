import { StyleSheet } from "react-native";
import { colors, spacing, sizes, shadow } from '~/constants/theme';
export const styles = StyleSheet.create({
  headerSearch: {
    display: 'flex',
    height: 70,
    width: '100%',
    // backgroundColor: colors.primary,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  field: {
    paddingLeft: spacing.xl + spacing.s,
    paddingRight: spacing.m,
    borderRadius: sizes.radius,
    width: "90%",
    flex: 1,
    ...shadow.light,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  searchView: {

    backgroundColor: "#fff",
    height: 45,
    width: 320,
    marginLeft: 10,
    borderRadius: 15,

  },
  iconClear: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
