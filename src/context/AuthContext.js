import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState } from "react";
import { getTokenLogin } from "~/api/Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState("");

    const login = async ({ email, password }) => {
        setIsLoading(true);
        try {
            console.log("Test email input : ", email);
            console.log("Test pass  input  : ", password);

            const res = await getTokenLogin({ email, password });
            console.log('test 2 get token: \n',res);
            if (res.access_token) {
                console.log("Test token : \n", res.access_token);
                console.log("Test user  : \n", res.user);

                console.log('test 3 get token: \n',"done and success");
                setUserToken(res.access_token);
                AsyncStorage.setItem('userToken', JSON.stringify(userToken))
                console.log('userToken luu vao storage : \n', userToken);
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
            AsyncStorage.removeItem ('userToken');
            setUserToken("")
            setIsLoading(false);

            console.log("Test logout : ","success");

        } catch (error) {
            console.log(`Logout error : ${error}`)
            setIsLoading(false);
        }

    }

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userToken,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
}