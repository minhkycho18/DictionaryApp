import { StyleSheet } from "react-native";
import { configFont, colors } from "~/constants/theme";
export const styles = StyleSheet.create({
  inputContent: {
    marginTop: 20,
    padding: 30,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  formLabel: {
    fontWeight: "500",
    fontSize: 16,
    color: colors.textTitle,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "white",
    fontWeight: "500",
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 15,
  },
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    marginLeft: -10,
  },
  headerBottomSheet: {
    fontSize: 23,
    color: colors.textTitle,
    marginTop: 15,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#F4A892",
    justifyContent: "center",
  },
  viewButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    justifyContent: "space-around",
    marginTop: 25,
  },
  warning: {
    borderColor: "red",
  },
  remove_warning: {
    borderColor: "#e0e0e0",
  },
});
