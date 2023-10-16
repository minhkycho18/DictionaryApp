import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromAsyncStorage = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token ? JSON.parse(token) : "";
    } catch (error) {
        console.log(`Get token ::`, error);
    }
}

export const checkLogin = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token ? true : false;
    } catch (error) {
        console.log(`Get token ::`, error);
    }
}