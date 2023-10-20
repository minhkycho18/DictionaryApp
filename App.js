
import { AuthProvider } from '~/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationAuth from '~/navigations/NavigationAuth';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from '~/navigations/bottomTab';
import AddWordList from '~/components/YourWordList/AddWordList/AddWordList';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>

      <NavigationContainer>


        <Stack.Navigator options={{ headerShown: false }}>
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

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>

    // 
  );
}


