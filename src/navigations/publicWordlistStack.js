import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import PublicWordlist from '~/components/PublicWordlist/PublicWordlist';
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import PublicWordlistDetail from '~/screens/PublicWordlistDetail';
export default function PublicWordlistStack(props) {
    const Stack = createNativeStackNavigator();

    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }

    return (

        <Stack.Navigator screenOptions={{ headerShadowVisible: false }} >
            <Stack.Screen
                initialParams={props.route.params}
                name="publicwordlist"
                component={PublicWordlist}
                options={
                    {
                        title: props.route.params.type === "public" ? "Public Wordlist" : "Default Wordlist",
                        headerTitleStyle: {
                            color: colors.textTitle,
                            fontSize: 25,
                            fontFamily: 'Quicksand-Bold',
                        },
                        headerTitleAlign: 'center',
                    }
                }
            />
            <Stack.Screen
                name="publicwordlistDetail"
                component={PublicWordlistDetail}
                options={{ headerShown: false }}
            />



        </Stack.Navigator>

    )
} 