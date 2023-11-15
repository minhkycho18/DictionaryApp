

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FinishGame from '~/components/Game/FinishGame';
import FlashcardScreen from '~/screens/FlashcardScreen';
import ReviewScreen from '~/screens/ReviewScreen';
import SpellingScreen from '~/screens/SpellingScreen';
export default function GameStack() {
    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            initialRouteName="GameStack"
            screenOptions={{ headerShadowVisible: false }}

        >
            <Stack.Screen
                name="SpellingScreen"
                component={SpellingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ReviewScreen"
                component={ReviewScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FinishGame"
                component={FinishGame}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FlashCardScreen"
                component={FlashcardScreen}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>

    );
}

