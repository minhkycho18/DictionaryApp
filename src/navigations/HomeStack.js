

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '~/screens/HomeScreen';
import YourWordList from '~/screens/YourWordList';
import YourWordlistDetail from '~/screens/YourWordListDetail';
import { ListVocalProvider } from '~/context/ListVocal';
import PublicWordlistStack from './publicWordlistStack';
import { colors } from '~/constants/theme';
export default function HomeStack() {
    const Stack = createNativeStackNavigator();

    return (
        <ListVocalProvider>
            <Stack.Navigator
                initialRouteName="HomeStack"
                screenOptions={{ headerShadowVisible: false }}

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
                <Stack.Screen
                    name="publicWordlist"
                    component={PublicWordlistStack}
                    options={
                        {
                            title: "Public Wordlist",
                            headerTitleStyle: {
                                color: colors.textTitle,
                                fontSize: 25,
                                fontFamily: 'Quicksand-Bold',
                            },
                            headerTitleAlign: 'center',
                            headerTintColor: '#07285a'

                        }
                    }
                />



            </Stack.Navigator>
        </ListVocalProvider>
    );
}

