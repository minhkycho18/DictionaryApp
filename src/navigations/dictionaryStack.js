

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dictionary from "../screens/Dictionary/Dictionary";
import VocalDetail from "../screens/VocalDetail/VocalDetail";


export default function DictionaryStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="dictionaryStack"
    >
      <Stack.Screen
        name="Dictionary"
        component={Dictionary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VocalDetail"
        component={VocalDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

