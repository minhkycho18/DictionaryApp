import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/HomeScreen';
import DictionaryStack from "./dictionaryStack";
import Profile from "../screens/ProfileScreen";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/Style";
import { useRef, useState, useEffect } from 'react'
import { Dimensions, Animated, Keyboard, Platform } from "react-native";

export default function BottomTab() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const Tab = createBottomTabNavigator();

  function getWidth() {
    let width = Dimensions.get("window").width
    width = width - 80
    return width / 3

  }
  useEffect(() => {
    // Add event listeners for keyboard show/hide
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        // Optionally, you can animate the Animated.View out of the screen
        Animated.spring(tabOffsetValue, {
          toValue: getWidth(),
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        // Optionally, you can animate the Animated.View back to its original position
        Animated.spring(tabOffsetValue, {
          toValue: getWidth() * 1.23,
          useNativeDriver: true,
        }).start();
      }
    );

    // Cleanup event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);




  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-outline"
            }
            else if (route.name === "DictionaryStack") {
              iconName = "book-outline"
            }
            else if (route.name === "Profile") {
              iconName = "md-person-outline"
            }

            return <Ionicons name={iconName} size={27} color={color} style={{ marginTop: 4 }} />
          },
          tabBarActiveTintColor: "#007EFF",
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 75 : 60,
            paddingTop: 1,
            paddingBottom: Platform.OS === 'ios' ? 18 : 2,
          },
          tabBarHideOnKeyboard: "true"

        })}
      >
        <Tab.Screen name="Home" component={Home} options={styles.tabScreenStyle}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() - 105,
                useNativeDriver: true
              }).start();
            }
          })} />
        <Tab.Screen name="DictionaryStack" component={DictionaryStack} options={{
          tabBarLabel: 'Dictionary',
          ...styles.tabScreenStyle
        }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.23,
                useNativeDriver: true
              }).start();
            }
          })} />
        <Tab.Screen name="Profile" component={Profile} options={styles.tabScreenStyle}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2.54,
                useNativeDriver: true
              }).start();
            }
          })} />

      </Tab.Navigator>
      {!keyboardVisible && (
        <Animated.View style={{
          width: getWidth() - 3,
          transform: [
            { translateX: tabOffsetValue }
          ],
          ...styles.animatedViewStyle,
          bottom: Platform.OS === 'ios' ? 71 : 57
        }}></Animated.View>
      )}
    </NavigationContainer>

  )

}
