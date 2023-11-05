
import { AuthProvider } from '~/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationAuth from '~/navigations/NavigationAuth';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from '~/navigations/bottomTab';
import AddWordList from '~/components/YourWordList/AddWordList/AddWordList';
import TopTabAddWordToSub from '~/navigations/TopTabAddWordToSub';
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import Index from '~/components/Study';
export default function App() {
  const Stack = createNativeStackNavigator();
  const [loaded] = useFonts(configFont);
  if (!loaded) {
    return null;
  }
  return (
    <AuthProvider>

      <NavigationContainer>


        <Stack.Navigator options={{ headerShown: false }} screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen
            name="BottomTab"
            options={{ headerShown: false }}
            component={BottomTab}
          />
          <Stack.Screen
            name="Authenticate"
            options={{ headerShown: false }}
            component={NavigationAuth}
          />
          <Stack.Screen
            name="AddWordlist"
            component={AddWordList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddWordToSub"
            component={TopTabAddWordToSub}
            options={
              {
                title: "Select words",
                headerTitleStyle: {
                  color: colors.textTitle,
                  fontSize: 26,
                  fontFamily: 'Quicksand-Bold'
                }

              }
            }
          />
          <Stack.Screen
            name="StudySub"
            component={Index}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>

    // 
  );
}