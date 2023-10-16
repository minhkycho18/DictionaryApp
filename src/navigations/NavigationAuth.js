import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '~/screens/LoginScreen';
import SignUpScreen from '~/screens/SignUpScreen';
import { AuthContext } from '~/context/AuthContext';
import { useContext } from 'react';
import Home from '~/screens/Home';

export default function NavigationAuth() {
    const Stack = createNativeStackNavigator();
    const { userToken } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator
            //  initialRouteName='Login' 
            >
                {userToken ? (
                    // <BottomTab />
                    <Stack.Screen
                            name='Home'
                            component={Home}
                            options={{ headerShown: false }}
                        />
                ) :
                    <>
                        <Stack.Screen
                            name='Login'
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name='SignUp'
                            component={SignUpScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
}


