
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '~/screens/LoginScreen';
import SignUpScreen from '~/screens/SignUpScreen';


export default function NavigationAuth() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="AuthStack"
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}

            />



        </Stack.Navigator>
    );

}


