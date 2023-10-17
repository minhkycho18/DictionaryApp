import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp
} from "react-native-reanimated";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

//ignore all log notification
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Asyncstorage: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

import Toast, { ErrorToast } from 'react-native-toast-message';
import { AuthContext } from "~/context/AuthContext";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const handlePressOutside = () => {
    Keyboard.dismiss(); // Ẩn bàn phím khi bấm ra ngoài
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const nicknameRef = useRef();

  const [selectedGender, setSelectedGender] = useState("male");
  const onGenderChange = (itemValue, itemIndex) => {
    setSelectedGender(itemValue);
  };

  const data = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleEmailSubmit = () => {
    passwordRef.current.focus();
  };
  const handlePwSubmit = () => {
    confirmpasswordRef.current.focus();
  };
  const handlePwConfirmSubmit = () => {
    nicknameRef.current.focus();
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');
  const { isLoading, register } = useContext(AuthContext);

  const [warningMail, setWarningMail] = useState(false);
  const [warningPw, setWarningPw] = useState(false);
  const [warningPwConfirm, setWarningPwConfirm] = useState(false);
  const [warningNickname, setWarningNickname] = useState(false);
  const [warningGender, setWarningGender] = useState(false);

  const [isFocusMail, setIsFocusMail] = useState(false);
  const [isFocusPw, setIsFocusPw] = useState(false);
  const [isFocusPwConfirm, setIsFocusPwConfirm] = useState(false);
  const [isFocusNickname, setIsFocusNickname] = useState(false);
  const [isFocusGender, setIsFocusGender] = useState(false);
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const handlePressItem = async () => {
    console.log("Test : ", "Click Sign up");
    const data_input = {
      email: email,
      password: password,
      name: nickname,
      gender: gender,
      // email: 'user04@gmail.com',
      // password: '1234',
      // name: 'Thanh',
      // gender: 'MALE',
    };

    console.log("Test data input :\n", data_input);
    // const i = await register(data_input);
    switch ('') {
      case email:
        ((!isFocusMail)) ? emailRef.current.focus() : setWarningMail(true);
        break;
      case password:
        ((!isFocusPw)) ? passwordRef.current.focus() : setWarningPw(true);
        break;
      case passwordConfirm:
        ((!isFocusPwConfirm)) ? confirmpasswordRef.current.focus() : setWarningPwConfirm(true);
        break;
      case nickname:
        ((!isFocusNickname)) ? nicknameRef.current.focus() : setWarningNickname(true);
        break;
      case gender:
        setWarningGender(true);
        break;
      default:
        handlePressOutside();
        //validate Email

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
          console.log("Email is Not Correct");
          showToast("error", "Error", "Invalid Email Format, please check again!");
          setWarningMail(true);
        }
        else {
          if (password !== passwordConfirm) {
            showToast("error", "Error", "Password doesn't match, please check again!");
            console.log("Password        : ", password);
            console.log("Password Confirm: ", passwordConfirm);
            Error_Password();
          }
          else {
            try {
              console.log("Test : ", "Pass all! Call APIIII!");
              //call api
              const i = await register(data_input);
              if (i === '400') {
                showToast("error", "Error", "Email already exists!");
              }
              else {
                showToast("error", "Success", "Register success!");
                // console.log('before');

                // delay(3000);
            
                // console.log('after');
              }
              // showToast("success", "Success", "Register success!");

            } catch (error) {
              console.log("Error : ", error);
            }
          }
        }
        break;
    }


  }

  //Toast
  const showToast = (type, text1, text2) => {
    Toast.show({
      position: 'top',
      type: type,
      text1: text1,
      text2: text2,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 55,

    })
  }

  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14
        }}
        text2Style={{
          fontSize: 12
        }}
      />
    )
  };

  //Warning
  const handleBlurEmail = () => {
    if (email === '') {
      setWarningMail(true);
    }
    setIsFocusMail(false);
  };
  const handleBlurPw = () => {
    if (password === '') {
      setWarningPw(true);
    }
    setIsFocusPw(false);
  };
  const handleBlurPwConfirm = () => {
    if (passwordConfirm === '') {
      setWarningPwConfirm(true);
    }
    setIsFocusPwConfirm(false);
  };
  const handleBlurNickname = () => {
    if (nickname === '') {
      setWarningNickname(true);
    }
    setIsFocusNickname(false);
  };

  const handleFocusEmail = () => {
    setWarningMail(false);
    setIsFocusMail(true);
  };
  const handleFocusPw = () => {
    setWarningPw(false);
    setIsFocusPw(true);
  };
  const handleFocusPwConfirm = () => {
    setWarningPwConfirm(false);
    setIsFocusPwConfirm(true);
  };
  const handleFocusNickname = () => {
    setWarningNickname(false);
    setIsFocusNickname(true);
  };
  const onChangeMail = (text) => {
    if (warningMail) {
      setWarningMail(false);
    }
    setEmail(text);
  }
  const onChangePw = (text) => {
    if (warningPw) {
      setWarningPw(false);
    }
    setPassword(text);
  }
  const onChangePwConfirm = (text) => {
    if (warningPwConfirm) {
      setWarningPwConfirm(false);
    }
    setPasswordConfirm(text);
  }
  const onChangeNickname = (text) => {
    if (warningNickname) {
      setWarningNickname(false);
    }
    setNickname(text);
  }

  const Error_Password = () =>
  {
    setWarningPw(true);
    setWarningPwConfirm(true);
  }
  return (
      <KeyboardAvoidingView
        // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === "ios" ? "position" : null}
        enabled
        keyboardVerticalOffset={-30}
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={tw`bg-white h-full w-full`}>
            <StatusBar style="light" />
            <Image
              style={tw`h-full w-full absolute`}
              source={require("~/assets/background_login.png")}
            />

            {/* lights */}
            <View style={tw`flex-row justify-around w-full absolute`}>
              <Animated.View
                style={tw`h-[95] w-[116]`}
                entering={FadeInUp.delay(200).duration(1000).springify()}
              >
                <Image
                  style={tw`h-[95] w-[114]`}
                  source={require("~/assets/icon_login.png")}
                />
              </Animated.View>
            </View>
            <Toast config={toastConfig} ref={(ref) => { Toast.setRef(ref) }} />

            {/* title and form */}
            <View style={tw`h-full w-full flex justify-around pt-60 pb-8`}>
              {/* title */}
              <View style={[tw`flex items-center pt-9`, { marginTop: 12 }]}>
                <Animated.Text
                  entering={FadeInUp.duration(1000).springify()}
                  style={[
                    tw`text-white font-bold tracking-wider text-5xl mb-4`,
                    { color: "#4F88A6" },
                  ]}
                >
                  Sign Up
                </Animated.Text>
              </View>

              {/* form */}
              <View style={[tw`flex items-center mx-5`]}>
                {/* Email */}
                <Animated.View
                  entering={FadeInDown.duration(1000).springify()}
                  style={[tw`bg-black/10 p-5 rounded-2xl w-full mb-2`,
                  warningMail && { borderColor: "#FF0000", borderWidth: 1, }
                  ]}
                >
                  <View style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <TextInput
                      style={{ flex: 1 }}
                      ref={emailRef}
                      placeholder="Email"
                      placeholderTextColor={"gray"}
                      onSubmitEditing={handleEmailSubmit}
                      value={email}
                      onChangeText={text => onChangeMail(text)}
                      onBlur={handleBlurEmail}
                      onFocus={handleFocusEmail}
                    />
                    {warningMail && (
                      <View style={{
                        flex: 0,
                      }}>
                        <Image
                          source={require("~/assets/warning.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                    )}
                  </View>

                </Animated.View>

                {/* Password */}
                <Animated.View
                  entering={FadeInDown.delay(100).duration(1000).springify()}
                  style={[tw`bg-black/10 p-5 rounded-2xl w-full mb-2`,
                  warningPw && { borderColor: "#FF0000", borderWidth: 1, }
                  ]}>
                  <View style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <TextInput
                      style={{ flex: 1 }}
                      ref={passwordRef}
                      placeholder="Password"
                      placeholderTextColor={"gray"}
                      onSubmitEditing={handlePwSubmit}
                      secureTextEntry
                      value={password}
                      onChangeText={text => onChangePw(text)}
                      onBlur={handleBlurPw}
                      onFocus={handleFocusPw}
                    />
                    {warningPw && (
                      <View style={{
                        flex: 0,
                      }}>
                        <Image
                          source={require("~/assets/warning.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                    )}
                  </View>
                </Animated.View>

                {/* Confirm Password */}
                <Animated.View
                  entering={FadeInDown.delay(200).duration(1000).springify()}
                  style={[tw`bg-black/10 p-5 rounded-2xl w-full mb-2`,
                  warningPwConfirm && { borderColor: "#FF0000", borderWidth: 1, }
                  ]}>
                  <View style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <TextInput
                      style={{ flex: 1 }}
                      ref={confirmpasswordRef}
                      placeholder="Confirm Password"
                      placeholderTextColor={"gray"}
                      onSubmitEditing={handlePwConfirmSubmit}
                      secureTextEntry
                      value={passwordConfirm}
                      onChangeText={text => onChangePwConfirm(text)}
                      onBlur={handleBlurPwConfirm}
                      onFocus={handleFocusPwConfirm}
                    />
                    {warningPwConfirm && (
                      <View style={{
                        flex: 0,
                      }}>
                        <Image
                          source={require("~/assets/warning.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                    )}
                  </View>
                </Animated.View>

                {/* Nickname */}
                <Animated.View
                  entering={FadeInDown.delay(300).duration(1000).springify()}
                  style={[tw`bg-black/10 p-5 rounded-2xl w-full mb-2`,
                  warningNickname && { borderColor: "#FF0000", borderWidth: 1, }
                  ]}>
                  <View style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <TextInput
                      style={{ flex: 1 }}
                      ref={nicknameRef}
                      placeholder="Nickname"
                      placeholderTextColor={"gray"}
                      value={nickname}
                      onChangeText={text => onChangeNickname(text)}
                      onBlur={handleBlurNickname}
                      onFocus={handleFocusNickname}
                    />
                    {warningNickname && (
                      <View style={{
                        flex: 0,
                      }}>
                        <Image
                          source={require("~/assets/warning.png")}
                          style={{ width: 16, height: 16 }}
                        />
                      </View>
                    )}
                  </View>
                </Animated.View>

                {/* Gender */}
                <Animated.View
                  entering={FadeInDown.delay(400).duration(1000).springify()}
                  style={[tw`bg-black/10 rounded-2xl w-full mb-4`,
                  warningGender && { borderColor: "#FF0000", borderWidth: 1, }
                  ]}>
                  <View style={{
                    flex: 0,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <Dropdown
                      Animated
                      style={[styles.dropdown]}
                      data={data}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.inputSearchStyle}
                      maxHeight={100}
                      labelField="label"
                      valueField="value"
                      placeholder={"Select Gender"}
                      value={gender}
                      onChange={(item) => {
                        setGender(item.value);
                        setWarningGender(false);
                      }}
                    />
                  </View>

                </Animated.View>

                {/* Button Sign Up */}
                <Animated.View
                  style={tw`w-full`}
                  entering={FadeInDown.delay(500).duration(1000).springify()}
                >
                  <TouchableOpacity
                    style={[
                      tw`w-full bg-sky-400 p-3 rounded-2xl mb-4`,
                      { backgroundColor: "#4F88A6" },
                    ]}
                    onPress={handlePressItem}
                  >
                    <Text style={tw`text-xl font-bold text-white text-center`}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* Button Sign In */}
                <Animated.View
                  entering={FadeInDown.delay(600).duration(1000).springify()}
                  style={tw`flex-row justify-center`}
                >
                  <Text>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.push("Login")}>
                    <Text style={tw`text-sky-600 underline`}>Login</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      

  );
}

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 14,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "gray",
  },
  inputSearchStyle: {
    fontSize: 14,
    color: "gray",
    paddingLeft: 5,
  },
  dropdown: {
    height: 56,
    fontSize: 10,
    paddingHorizontal: 20,
    paddingRight: 10,
  },
});
