import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, StyleSheet } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeInUp, convertToRGBA } from 'react-native-reanimated';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { getTokenLogin } from '~/api/Auth'
//ignore all log notification
import { LogBox } from 'react-native';
import { AuthContext } from '~/context/AuthContext';
import AppLoader from '~/components/AppLoader';
// import ToastNotification from '~/components/toast';
import Toast, { ErrorToast } from 'react-native-toast-message';

LogBox.ignoreLogs(['Asyncstorage: ...']); // Ignore log notification by message
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, login } = useContext(AuthContext);

    const [warningMail, setWarningMail] = useState(false);
    const [warningPw, setWarningPw] = useState(false);

    const handlePressItem = async () => {
        console.log("Test : ", "Click Sign in");
        const data = {
            email: email,
            password: password,
            // email: 'user01@gmail.com',
            // password: '1234'
        };
        if (email == '' || password == '') {
            if (email == '') {
                emailRef.current.focus()
            }
            else passwordRef.current.focus()
        }
        else {
            handlePressOutside();
            if (email.includes('@gmail.com')) {
                {
                    try {
                        const i = await login(data);
                        if (i == 0) {
                            showToast();
                        }
                        else {
                            console.log("test : ", 'PASSSSSS');
                        }

                    } catch (error) {
                        console.log("Error : ", error);
                    }
                }
            }
            else
            {
                showToastEmail();
            }

        }

    }

    //Toast
    const showToast = () => {
        console.log("check", " click here")
        Toast.show({
            position: 'top',
            type: "error",
            text1: "Login Fail",
            text2: "Invalid Email or Password, please try again!",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 55,
        })
    }

    const showToastEmail = () => {
        setWarningMail(true);
        Toast.show({
            position: 'top',
            type: "error",
            text1: "Error",
            text2: "Invalid Email Format, please check again!",
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
        } else {
            setWarningMail(false);
        }
    };
    const handleBlurPw = () => {
        if (password === '') {
            setWarningPw(true);
        } else {
            setWarningPw(false);
        }
    };

    const handleFocusEmail = () => {
        setWarningMail(false);
    };
    const handleFocusPw = () => {
        setWarningPw(false);
    };

    return (
        <>
            <KeyboardAvoidingView
                // style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                behavior={Platform.OS === 'ios' ? 'position' : null}
                enabled
                keyboardVerticalOffset={-10}
            >
                <TouchableWithoutFeedback onPress={handlePressOutside}>

                    <View style={tw`bg-white h-full w-full`} >
                        <StatusBar style="light" />
                        <Image
                            style={tw`h-full w-full absolute`}
                            source={require("~/assets/background_login.png")}
                        />

                        <Toast config={toastConfig} ref={(ref) => { Toast.setRef(ref) }} />

                        {/* lights */}
                        <View style={tw`flex-row justify-around w-full absolute`}>
                            <Animated.View
                                style={tw`h-[124] w-[115]`}
                                entering={FadeInUp.delay(200).duration(1000).springify()}
                            >
                                <Image
                                    style={tw`h-[124] w-[115]`}
                                    source={require('~/assets/icon_login.png')}
                                />
                            </Animated.View>

                        </View>

                        {/* title and form */}
                        <View
                            style={tw`h-full w-full flex justify-around pt-80 pb-12`}
                        >
                            {/* title */}
                            <View
                                style={[tw`flex items-center pt-9`, { marginTop: 12 }]}
                            >
                                <Animated.Text
                                    entering={FadeInUp.duration(1000).springify()}
                                    style={[tw`text-white font-bold tracking-wider text-5xl mb-4`, { color: '#4F88A6' }]}
                                >
                                    Login
                                </Animated.Text>
                            </View>

                            {/* form */}
                            <View
                                style={[tw`flex items-center mx-5`]}
                            >
                                {/* <Text>{val}</Text> */}
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    style={[tw`bg-black/10 p-5 rounded-2xl w-full mb-4`,
                                    warningMail && { borderColor: "#FF0000", borderWidth: 1, }
                                    ]}
                                // onPress={emailRef.current.focus()}
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
                                            placeholderTextColor={'gray'}
                                            onSubmitEditing={handleEmailSubmit}
                                            value={email}
                                            onChangeText={text => setEmail(text)}
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

                                <Animated.View
                                    entering={FadeInDown.delay(200).duration(1000).springify()}
                                    style={[tw`bg-black/10 p-5 rounded-2xl w-full mb-8`,
                                    warningPw && { borderColor: "#FF0000", borderWidth: 1, }
                                    ]}
                                >
                                    <View style={{
                                        flex: 0,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',

                                    }}>
                                        <TextInput
                                            style={{ flex: 1 }}
                                            ref={passwordRef}
                                            placeholder="Password"
                                            placeholderTextColor={'gray'}
                                            secureTextEntry
                                            value={password}
                                            onChangeText={text => setPassword(text)}
                                            onBlur={handleBlurPw}
                                            onFocus={handleFocusPw}
                                        />
                                        {warningPw && (
                                            <View style={{
                                                flex: 0,
                                            }}>
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
                                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                                    <TouchableOpacity
                                        style={[tw`w-full bg-sky-400 p-3 rounded-2xl mb-7`, { backgroundColor: '#4F88A6' }]}
                                        onPress={handlePressItem}
                                    >
                                        <Text style={tw`text-xl font-bold text-white text-center`}
                                        >Sign In</Text>
                                    </TouchableOpacity>
                                </Animated.View>

                                <Animated.View
                                    entering={FadeInDown.delay(600).duration(1000).springify()}
                                    style={tw`flex-row justify-center`}
                                >
                                    <Text>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                                        <Text style={tw`text-sky-600 underline`}
                                        >Sign Up</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {isLoading ? <AppLoader /> : ''}
            </KeyboardAvoidingView>
        </>
    )
}