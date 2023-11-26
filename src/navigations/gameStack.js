

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FinishGame from '~/components/Game/FinishGame';
import FinishQuiz from '~/components/Game/FinishQuiz';
import FlashcardScreen from '~/screens/FlashcardScreen';
import QuizScreen from '~/screens/QuizScreen';
import ReviewScreen from '~/screens/ReviewScreen';
import SpellingScreen from '~/screens/SpellingScreen';
export default function GameStack(props) {
    const Stack = createNativeStackNavigator();

    const sub = props.route.params.sub
    return (

        <Stack.Navigator
            initialRouteName="GameStack"
            screenOptions={{ headerShadowVisible: false }}

        >
            <Stack.Screen
                name="ReviewScreen"
                component={ReviewScreen}
                options={{ headerShown: false }}
                initialParams={sub}
            />
            <Stack.Screen
                name="SpellingScreen"
                component={SpellingScreen}
                options={{ headerShown: false }}
                initialParams={sub}
            />


            <Stack.Screen
                name="FinishGame"
                component={FinishGame}
                options={{ headerShown: false }}
                initialParams={sub}
            />
            <Stack.Screen
                name="FlashCardScreen"
                component={FlashcardScreen}
                options={{ headerShown: false }}
                initialParams={sub}
            />
            <Stack.Screen
                name="QuizScreen"
                component={QuizScreen}
                options={{ headerShown: false }}
                initialParams={sub}
            />
            <Stack.Screen
                name="FinishQuiz"
                component={FinishQuiz}
                options={{ headerShown: false }}
                initialParams={sub}
            />


        </Stack.Navigator>

    );
}

