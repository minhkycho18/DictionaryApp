

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FlashcardLeitnerScreen from '~/screens/FlashcardLeitnerScreen';
import Leitner from '~/screens/Leitner';
import LeitnerDetail from '~/screens/LeitnerDetail';

export default function  LeitnerStack() {
    const Stack = createNativeStackNavigator();


    return (

        <Stack.Navigator

            screenOptions={{ headerShadowVisible: false }}

        >
            <Stack.Screen
                name="HomeLeitner"
                component={Leitner}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="LeitnerDetail"
                component={LeitnerDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlashcardLeitnerScreen"
                component={FlashcardLeitnerScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>

    );
}

