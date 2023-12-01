import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '~/screens/ProfileScreen';
import ProfileDetailScreen from '~/screens/ProfileDetailScreen';
import YourWordList from '~/screens/YourWordList';
import YourWordlistDetail from '~/screens/YourWordListDetail';
import Leitner from '~/screens/Leitner';
import LeitnerDetail from '~/screens/LeitnerDetail';
export default function ProfileStack() {
    const Stack = createNativeStackNavigator();


    return (

        <Stack.Navigator screenOptions={{ headerShadowVisible: false }} initialRouteName="profileStack">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProfileDetail"
                component={ProfileDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Leitner"
                component={Leitner}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="LeitnerDetail"
                component={LeitnerDetail}
                options={{ headerShown: false }}
            /> */}
            
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

    )
} 