import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Register, getTokenLogin } from "~/api/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [splashLoading, setSplashLoading] = useState(false);

    const login = async ({ email, password }) => {
        setIsLoading(true);
        try {
            console.log("Test email input : ", email);
            console.log("Test pass  input  : ", password);

            const res = await getTokenLogin({ email, password });
            console.log('test 2 get token: \n', res);
            if (res.access_token) {
                console.log("Test token : \n", res.access_token);
                console.log("Test user  : \n", res.user);

                console.log('test 3 get token: \n', "done and success");
                setUserToken(res.access_token);
                console.log('userToken luu vao storage22 : \n', userToken);
                AsyncStorage.setItem('userToken', userToken)
                // console.log('userToken luu vao storage : \n', userToken);
            }

            setIsLoading(false);

            // if(res.access_token)
            // {

            // }
        } catch (error) {
            console.log(`Login error : ${error}`)
            setIsLoading(false);
            return 0;
        }
        // getTokenLogin({ email, password }).then(res => {
        //     let userInfo = res.data;
        //     console.log(userInfo);
        //     setUserInfo(userInfo);
        //     // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        //     setIsLoading(false)
        // }).catch(e => {
        //     console.log(`login error ${e}`);
        //     setIsLoading(false);
        // })


        // return res;

    }

    const logout = () => {
        setIsLoading(true);
        try {
            AsyncStorage.removeItem('userToken');
            setUserToken("")
            setIsLoading(false);

            console.log("Test logout : ", "success");

        } catch (error) {
            console.log(`Logout error : ${error}`)
            setIsLoading(false);
        }

    }

    const register = async ({ email, password, name, gender }) => {
        setIsLoading(true);
        try {
            console.log("Test email input    : ", email);
            console.log("Test pass  input    : ", password);
            console.log("Test name input : ", name);
            console.log("Test gender  input  : ", gender);

            const res = await Register({ email, password, name, gender });
            console.log('test 2: \n', res);
            if (res.access_token) {
                console.log("Test token : \n", res.access_token);
                console.log("Test user  : \n", res.user);

                console.log('test 3 get token: \n', "done and success");
                setUserToken(res.access_token);
                AsyncStorage.setItem('userToken', userToken)
                console.log('userToken luu vao storage : \n', userToken);
            }

            setIsLoading(false);
            return '200';
        } catch (error) {
            
            console.log(`Login error : ${error.status}`)
            setIsLoading(false);
            return '400';
        }
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userToken = await AsyncStorage.getItem('userToken');
            if(userToken)
            {
                setUserToken(setUserToken);
            }

            setSplashLoading(false);
            
        } catch (error) {
            console.log(`is logged in error ${error}`)
        }
    }

    useEffect (() => {
        isLoggedIn();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userToken,
                splashLoading,
                login,
                logout,
                register,
                isLoggedIn
            }}>
            {children}
        </AuthContext.Provider>
    );
}