import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { ChangePass } from "~/api/Auth";
import { delay } from "~/helper";
export default function ChangePassScreen(props) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isOld, setIsOld] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [checkConfirm, setCheckConfirm] = useState(false);
  const [checkOld, setCheckOld] = useState(false);
  const [loaded] = useFonts(configFont);

  if (!loaded) {
    return null;
  }
  const handleChangePass = async () => {
    if (oldPass === "" || newPass === "" || confirmPass === "") {
      showToast("Error", "Please fill in all fields", "error");
    } else {
      if (confirmPass !== newPass) {
        showToast(
          "Error",
          "Please make sure your confirm password match",
          "error"
        );
      } else {
        try {
          const res = await ChangePass({
            oldPassword: oldPass,
            newPassword: newPass,
          });
          showToast("Success", "Reset password success", "success");
          await delay(1000);
          props.navigation.navigate("Authenticate");
        } catch (error) {
          showToast("Error", error, "error");
        }
      }
    }
  };
  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
    success: (props) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 14,
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };
  const showToast = (text1, text2, type) => {
    Toast.show({
      position: "top",
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 20,
    });
  };

  return (
    <SafeAreaView style={Styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#5671CC", "#9D97F9"]}
        style={{ flex: 1, paddingHorizontal: 20 }}
      >
        <View style={Styles.viewHeader}>
          <AntDesign
            name="arrowleft"
            size={25}
            color="#fff"
            style={{ padding: 3, marginTop: 5 }}
            onPress={() => props.navigation.goBack()}
          />
          <Text style={Styles.textHeader}>Reset Password</Text>
        </View>
        <View style={Styles.content}>
          <View style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>Old Password</Text>
              <View style={Styles.ViewInput}>
                <MaterialIcons name="lock-outline" size={24} color="#918CD3" />
                <TextInput
                  style={Styles.textPlacehoder}
                  value={oldPass}
                  onChangeText={setOldPass}
                  secureTextEntry={!isOld}
                />
                {isOld ? (
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color="#ccc"
                    onPress={() => setIsOld(!isOld)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="#ccc"
                    onPress={() => setIsOld(!isOld)}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>New Password</Text>

              <View style={Styles.ViewInput}>
                <MaterialIcons name="lock-outline" size={24} color="#918CD3" />
                <TextInput
                  style={Styles.textPlacehoder}
                  value={newPass}
                  onChangeText={setNewPass}
                  secureTextEntry={!isNew}
                />
                {isNew ? (
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color="#ccc"
                    onPress={() => setIsNew(!isNew)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="#ccc"
                    onPress={() => setIsNew(!isNew)}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={Styles.ViewItem}>
            <View>
              <Text style={Styles.textLabel}>Confirm Password</Text>

              <View style={Styles.ViewInput}>
                <MaterialIcons name="lock-outline" size={24} color="#918CD3" />
                <TextInput
                  style={Styles.textPlacehoder}
                  value={confirmPass}
                  onChangeText={setConfirmPass}
                  secureTextEntry={!isConfirm}
                />
                {isConfirm ? (
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color="#ccc"
                    onPress={() => setIsConfirm(!isConfirm)}
                  />
                ) : (
                  <Feather
                    name="eye-off"
                    size={24}
                    color="#ccc"
                    onPress={() => setIsConfirm(!isConfirm)}
                  />
                )}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={Styles.changePass}
            onPress={handleChangePass}
          >
            <Text style={{ ...Styles.textLabel, color: "#9D97F9" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>

        <Toast
          config={toastConfig}
          refs={(ref) => {
            Toast.setRef(ref);
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  viewHeader: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
    alignItems: "center",
  },
  textHeader: {
    fontFamily: "Quicksand-Bold",
    color: "#fff",
    fontSize: 26,
    letterSpacing: 0.2,
  },
  content: {
    width: "100%",
    height: 430,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 30,
    marginTop: "20%",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  viewImage: {
    backgroundColor: "#EDEDED",
    width: 130,
    height: 130,
    borderRadius: 90,
    position: "absolute",
    top: -80,
    left: "53%",
    transform: [{ translateX: -50 }],
  },
  viewEdit: {
    width: "100%",
    alignItems: "flex-end",
  },
  ViewItem: {
    // borderWidth: 1,
    // borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    marginTop: 25,
    // paddingBottom: 8,
  },
  textLabel: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
    color: colors.textColor,
  },
  textPlacehoder: {
    height: 40,
    width: "80%",
    fontFamily: "Quicksand-SemiBold",
    fontSize: 18,
    color: colors.textTitle,
    paddingHorizontal: 10,
  },
  viewGender: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 8,
  },
  cirle: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
  },
  cirle_choose: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#5671CC",
  },
  cirle_child: {
    width: 12,
    height: 12,
    backgroundColor: "#5671CC",
    borderRadius: 6,
  },
  changePass: {
    backgroundColor: "#fff",
    width: 150,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: "#9D97F9",
    position: "absolute",
    bottom: 15,
    left: "50%",
    transform: [{ translateX: -50 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconCamera: {
    position: "absolute",
    width: 20,
    height: 20,
  },
  viewCamera: {
    position: "absolute",
    backgroundColor: "rgb(228 228 231)",
    width: 35,
    height: 35,
    bottom: -40,
    left: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    zIndex: 1000,
  },
  ViewInput: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    justifyContent: "space-around",
    width: "100%",
    borderWidth: 1,
    borderColor: "#918CD3",
    borderRadius: 10,
  },
});
