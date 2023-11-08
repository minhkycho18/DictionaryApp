import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import PublicWordlist from '~/components/PublicWordlist/PublicWordlist';
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
export default function PublicWordlistStack() {
    const Stack = createNativeStackNavigator();
    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }

    return (

        <Stack.Navigator>
            <Stack.Screen
                name="publicwordlist"
                component={PublicWordlist}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>

    )
} 