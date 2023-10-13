import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import BottomTab from '~/navigations/bottomTab';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
    //     <Stack.Screen name='Login' component={LoginScreen}/>
    //     <Stack.Screen name='SignUp' component={SignUpScreen}/>
    //   </Stack.Navigator>
    // </NavigationContainer>
    <BottomTab />
  );
}


