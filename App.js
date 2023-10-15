import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '~/context/AuthContext';
import NavigationAuth from '~/navigations/NavigationAuth';

export default function App() {
  return (
    <AuthProvider>
      <NavigationAuth/>
    </AuthProvider>

    // <BottomTab />
  );
}


