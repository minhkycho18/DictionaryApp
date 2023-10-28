

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '~/screens/HomeScreen';
import YourWordList from '~/screens/YourWordList';
import YourWordlistDetail from '~/screens/YourWordListDetail';

export default function HomeStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="HomeStack"
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="YourWordlist"
                component={YourWordList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="YourWordlistDetail"
                component={YourWordlistDetail}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>
    );
}

