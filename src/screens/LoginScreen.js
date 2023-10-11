import { Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeInUp, convertToRGBA } from 'react-native-reanimated';
import tw from 'twrnc'

//ignore all log notification
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); 

export default function LoginScreen() {

    const handlePressOutside = () => {
        Keyboard.dismiss(); // Ẩn bàn phím khi bấm ra ngoài
      };

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleEmailSubmit = () => {
        passwordRef.current.focus();
    };
      

      return (
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

            {/* lights */}
            <View style={tw`flex-row justify-around w-full absolute`}>
                <Animated.View  
                    style={tw`h-[124] w-[115]`}
                    entering={FadeInUp.delay(200).duration(1000).springify()} 
                    // source={require('~/assets/icon_login.png')} 
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
                style={[tw`flex items-center pt-9`,{ marginTop: 12 }]}
                
                >
                <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()} 
                    style={[tw`text-white font-bold tracking-wider text-5xl mb-4`,{color: '#4F88A6'}]}
                    >
                        Login
                </Animated.Text>
                </View>

                {/* form */}
                <View 
                style={[tw`flex items-center mx-5`]}
                >
                    <Animated.View 
                        entering={FadeInDown.duration(1000).springify()} 
                        
                        style={tw`bg-black/10 p-5 rounded-2xl w-full mb-4`}
                        >

                        <TextInput
                            ref={emailRef}
                            placeholder="Email"
                            placeholderTextColor={'gray'}
                            onSubmitEditing={handleEmailSubmit}
                        />
                    </Animated.View>
                    <Animated.View 
                        entering={FadeInDown.delay(200).duration(1000).springify()} 
                        
                        style={tw`bg-black/10 p-5 rounded-2xl w-full mb-8`}
                        >

                        <TextInput
                            ref={passwordRef}
                            placeholder="Password"
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />
                    </Animated.View>

                    <Animated.View 
                        style={tw`w-full`} 
                        entering={FadeInDown.delay(400).duration(1000).springify()}>

                        <TouchableOpacity style={[tw`w-full bg-sky-400 p-3 rounded-2xl mb-7`,{ backgroundColor: '#4F88A6' }]} 
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
                        <TouchableOpacity onPress={()=> navigation.push('Signup')}>
                            <Text style={tw`text-sky-600 underline`} 
                            >Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </View>
        </View>
        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>



    )

}
