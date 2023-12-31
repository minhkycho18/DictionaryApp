import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useContext, useRef, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  convertToRGBA,
} from "react-native-reanimated";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { getTokenLogin } from "~/api/Auth";
//ignore all log notification
import { LogBox } from "react-native";
import { AuthContext } from "~/context/AuthContext";
import AppLoader from "~/components/AppLoader";
import Toast, { ErrorToast } from "react-native-toast-message";

LogBox.ignoreLogs(["Asyncstorage: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function LoginScreen() {
  const navigation = useNavigation();

  const handlePressOutside = () => {
    Keyboard.dismiss(); // Ẩn bàn phím khi bấm ra ngoài
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailSubmit = () => {
    passwordRef.current.focus();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useContext(AuthContext);

  const [warningMail, setWarningMail] = useState(false);
  const [warningPw, setWarningPw] = useState(false);
  const [isFocusMail, setIsFocusMail] = useState(false);
  const [isFocusPw, setIsFocusPw] = useState(false);
  const [isDisplay, setIsDisplay] = useState(true);
  const handlePressItem = async () => {
    console.log("Test : ", "Click Sign in");
    const data = {
      email: email,
      password: password,

      // email: 'user01@gmail.com',
      // password: '1234'
    };
    console.log("Test : ", data);

    if (email == "" || password == "") {
      if (email == "") {
        if (!isFocusMail) {
          emailRef.current.focus();
        } else {
          console.log("Test : ", "geeeeeeeeee");
          setWarningMail(true);
        }
      } else {
        if (!isFocusPw) {
          passwordRef.current.focus();
        } else {
          console.log("Test : ", "geeeeeeeeee pw");
          setWarningPw(true);
        }
      }
    } else {
      handlePressOutside();
      //validate Email
      if (email.includes("@gmail.com")) {
        {
          try {
            const i = await login(data);
            if (i == 0) {
              showToast(
                "Login Fail",
                "Invalid Email or Password, please try again!"
              );
            } else {
              console.log("test : ", "PASSSSSS");
              navigation.push("BottomTab");
            }
          } catch (error) {
            console.log("Error : ", error);
          }
        }
      } else {
        showToast("Error", "Invalid Email Format, please check again!");
        setWarningMail(true);
      }
    }
  };

  //Toast
  const showToast = (text1, text2) => {
    Toast.show({
      position: "top",
      type: "error",
      text1: text1,
      text2: text2,
      // text1: "Login Fail",
      // text2: "Invalid Email or Password, please try again!",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 55,
    });
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
  };

  //Warning
  const handleBlurEmail = () => {
    if (email === "") {
      setWarningMail(true);
    }
    setIsFocusMail(false);
  };
  const handleBlurPw = () => {
    if (password === "") {
      setWarningPw(true);
    }
    setIsFocusPw(false);
  };

  const handleFocusEmail = () => {
    setWarningMail(false);
    setIsFocusMail(true);
  };
  const handleFocusPw = () => {
    setWarningPw(false);
    setIsFocusPw(true);
  };
  const onChangeMail = (text) => {
    if (warningMail) {
      setWarningMail(false);
    }
    setEmail(text);
  };
  const onChangePw = (text) => {
    if (warningPw) {
      setWarningPw(false);
    }
    setPassword(text);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setIsDisplay(false);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsDisplay(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === "ios" ? "position" : null}
        enabled
        keyboardVerticalOffset={-200}
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={tw`bg-white h-full w-full`}>
            <StatusBar style="light" />
            <Image
              style={tw`h-full w-full absolute`}
              source={require("~/assets/background_login.png")}
            />

            <Toast
              config={toastConfig}
              refs={(ref) => {
                Toast.setRef(ref);
              }}
            />

            {/* lights */}

            {/* title and form */}
            <View style={{ justifyContent: "center", flex: 1 }}>
              <View style={[tw`flex mx-5`, { alignItems: "center" }]}>
                {isDisplay && (
                  <Animated.View
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                  >
                    <Image
                      style={{ width: 260, height: 200, marginRight: 10 }}
                      source={require("~/assets/icon_login.png")}
                      // resizeMode="center"
                    />
                  </Animated.View>
                )}

                <Animated.Text
                  entering={FadeInDown.duration(1000).springify()}
                  style={[
                    tw`text-white font-bold tracking-wider text-5xl mb-4`,
                    { color: "#4F88A6", marginTop: 10 },
                  ]}
                >
                  Login
                </Animated.Text>
                <Animated.View
                  entering={FadeInDown.duration(1000).springify()}
                  style={[
                    tw`bg-black/10 p-5 rounded-2xl w-full mb-4`,
                    warningMail && { borderColor: "#FF0000", borderWidth: 1 },
                  ]}
                  // onPress={emailRef.current.focus()}
                >
                  <View
                    style={{
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                      style={{ flex: 1 }}
                      ref={emailRef}
                      placeholder="Email"
                      placeholderTextColor={"gray"}
                      onSubmitEditing={handleEmailSubmit}
                      value={email}
                      onChangeText={(text) => onChangeMail(text)}
                      onBlur={handleBlurEmail}
                      onFocus={handleFocusEmail}
                    />
                    {warningMail && (
                      <View
                        style={{
                          flex: 0,
                        }}
                      >
                        <Image
                          source={require("~/assets/warning.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                    )}
                  </View>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(200).duration(1000).springify()}
                  style={[
                    tw`bg-black/10 p-5 rounded-2xl w-full mb-8`,
                    warningPw && { borderColor: "#FF0000", borderWidth: 1 },
                  ]}
                >
                  <View
                    style={{
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                      style={{ flex: 1 }}
                      ref={passwordRef}
                      placeholder="Password"
                      placeholderTextColor={"gray"}
                      secureTextEntry
                      value={password}
                      onChangeText={(text) => onChangePw(text)}
                      onBlur={handleBlurPw}
                      onFocus={handleFocusPw}
                      // keyboardType="email-address"
                    />
                    {warningPw && (
                      <View
                        style={{
                          flex: 0,
                        }}
                      >
                        <Image
                          source={require("~/assets/warning.png")}
                          style={{ width: 16, height: 16 }} // Xóa các thuộc tính position và chỉ định kích thước
                        />
                      </View>
                    )}
                  </View>
                </Animated.View>

                <Animated.View
                  style={tw`w-full`}
                  entering={FadeInDown.delay(400).duration(1000).springify()}
                >
                  <TouchableOpacity
                    style={[
                      tw`w-full bg-sky-400 p-3 rounded-2xl mb-7`,
                      { backgroundColor: "#4F88A6" },
                    ]}
                    onPress={handlePressItem}
                  >
                    <Text style={tw`text-xl font-bold text-white text-center`}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.delay(600).duration(1000).springify()}
                  style={tw`flex-row justify-center`}
                >
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.push("SignUp")}>
                    <Text style={tw`text-sky-600 underline`}>Register</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isLoading ? <AppLoader /> : ""}
      </KeyboardAvoidingView>
    </>
  );
}
