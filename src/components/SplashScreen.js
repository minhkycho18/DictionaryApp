import React from "react";
import { ActivityIndicator, View } from "react-native";
import Loader from 'react-native-three-dots-loader'
import { colors } from "~/constants/theme";
const SplashScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', height: 50, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.textColor} />
        </View>
    )
}

export default SplashScreen