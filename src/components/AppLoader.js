import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native'
import LottieView from "lottie-react-native";

const screenWidth = Dimensions.get('window').width;
const size_logo = 160

const AppLoader = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView
                style={[{
                    // flex: 1,
                    height: size_logo,
                    width: size_logo
                }]}
                source={require('~/assets/loading.json')}

                autoPlay
                loop />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingRight: screenWidth/2-size_logo/2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1
    }
})
export default AppLoader; 