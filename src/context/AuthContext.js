import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Register, getTokenLogin } from "~/api/Auth";
import { checkData } from "~/helper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState("");
    const [splashLoading, setSplashLoading] = useState(false);
    const [listReview, setlistReview] = useState([]);
    const [listSpellingError, setlistSpellingError] = useState([]);
    const [listFlashCardError, setlistFlashCardError] = useState([]);
    const [isLogin, setIsLogin] = useState(false)
    const login = async ({ email, password }) => {
        setIsLoading(true);
        try {
            const res = await getTokenLogin({ email, password });
            if (res.access_token) {
                setUserToken(res.access_token);
                await AsyncStorage.setItem('userToken', JSON.stringify(res.access_token))
                setIsLogin(true)
            }
            setIsLoading(false);
        } catch (error) {
            console.log(`Login error : ${error}`)
            setIsLoading(false);
            return 0;
        }


    }

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userToken');
            setUserToken("")
            setIsLoading(false);
            setIsLogin(false)
            console.log("Test logout : ", "success");

        } catch (error) {
            console.log(`Logout error : ${error}`)
            setIsLoading(false);
        }

    }

    const register = async ({ email, password, name, gender }) => {
        setIsLoading(true);
        try {
            const res = await Register({ email, password, name, gender });
            if (res.access_token) {
                setUserToken(res.access_token);
                await AsyncStorage.setItem('userToken', JSON.stringify(res.access_token))
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
            if (userToken) {
                setUserToken(setUserToken);
            }

            setSplashLoading(false);

        } catch (error) {
            console.log(`is logged in error ${error}`)
        }
    }
    const updateListReview = (data) => {
        const checked = checkData(listReview, data);
        if (!checked) {
            setlistReview((pre) => [
                ...pre,
                {
                    defId: data.defId,
                    vocabId: data.vocabId,
                },
            ]);
        }
    }


    useEffect(() => {
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
                isLoggedIn,
                isLogin,
                listReview,
                setlistReview,
                updateListReview,
                listFlashCardError,
                setlistFlashCardError,
                listSpellingError,
                setlistSpellingError
            }}>
            {children}
        </AuthContext.Provider>
    );
}