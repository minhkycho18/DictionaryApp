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
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  convertToRGBA,
} from "react-native-reanimated";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

//ignore all log notification
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Asyncstorage: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();

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
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <KeyboardAvoidingView
      // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      behavior={Platform.OS === "ios" ? "position" : null}
      enabled
      keyboardVerticalOffset={-10}
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
              style={tw`h-[95] w-[115]`}
              entering={FadeInUp.delay(200).duration(1000).springify()}
            >
              <Image
                style={tw`h-[95] w-[115]`}
                source={require("~/assets/icon_login.png")}
              />
            </Animated.View>
          </View>

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
                style={tw`bg-black/10 p-5 rounded-2xl w-full mb-2`}
              >
                <TextInput
                  ref={emailRef}
                  placeholder="Email"
                  placeholderTextColor={"gray"}
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                />
              </Animated.View>

              {/* Password */}
              <Animated.View
                entering={FadeInDown.delay(100).duration(1000).springify()}
                style={tw`bg-black/10 p-5 rounded-2xl w-full mb-2`}
              >
                <TextInput
                  ref={passwordRef}
                  placeholder="Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  onSubmitEditing={() => {
                    confirmpasswordRef.current.focus();
                  }}
                />
              </Animated.View>

              {/* Confirm Password */}
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                style={tw`bg-black/10 p-5 rounded-2xl w-full mb-2`}
              >
                <TextInput
                  ref={confirmpasswordRef}
                  placeholder="Confirm Password"
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  onSubmitEditing={() => {
                    nicknameRef.current.focus();
                  }}
                />
              </Animated.View>

              {/* Nickname */}
              <Animated.View
                entering={FadeInDown.delay(300).duration(1000).springify()}
                style={tw`bg-black/10 p-5 rounded-2xl w-full mb-2`}
              >
                <TextInput
                  ref={nicknameRef}
                  placeholder="Nickname"
                  placeholderTextColor={"gray"}
                  onSubmitEditing={() => {
                    nicknameRef.current.focus();
                  }}
                />
              </Animated.View>

              {/* Gender */}
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                style={tw`bg-black/10 rounded-2xl w-full mb-4`}
              >
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
                  value={value}
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                />
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
