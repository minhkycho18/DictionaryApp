

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Leitner from '~/screens/Leitner';

export default function LeitnerStack() {
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



        </Stack.Navigator>

    );
}

