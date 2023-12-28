import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import DictionaryStack from "./dictionaryStack";
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/Style";
import { useRef, useState, useEffect } from 'react'
import { Dimensions, Animated, Keyboard, Platform } from "react-native";
import ProfileStack from "./ProfileStack";

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
      }

    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);




  return (
    <>
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
            else if (route.name === "ProfileStack") {
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
        screenListeners={({ route }) => {
          if (route.name === "Home") {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() - 105,
              useNativeDriver: true
            }).start();
          }
          else if (route.name === "DictionaryStack") {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 1.23,
              useNativeDriver: true
            }).start();
          }
          else if (route.name === "ProfileStack") {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2.54,
              useNativeDriver: true
            }).start();
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} options={styles.tabScreenStyle}

        />
        <Tab.Screen name="DictionaryStack" component={DictionaryStack} options={{
          tabBarLabel: 'Dictionary',
          ...styles.tabScreenStyle
        }}

        />
        <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ ...styles.tabScreenStyle, tabBarLabel: 'Profile' }}

        />

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
    </>

  )

}
