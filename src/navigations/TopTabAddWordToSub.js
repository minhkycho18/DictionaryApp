import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from 'react'
import AddCustom from "../components/YourWordList/AddWordToSub/Custom/AddCustom";
import AddDefault from "../components/YourWordList/AddWordToSub/Default/AddDefault";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
export default function TopTabAddWordToSub() {
    const TopTabs = createMaterialTopTabNavigator();
    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
    return (
        <TopTabs.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: "capitalize",
                    fontWeight: "300",
                    fontSize: 15,
                    color: colors.textTitle,
                    fontFamily: "Quicksand-SemiBold"
                },
                tabBarIndicatorStyle: {
                    height: 3,
                    borderRadius: 5,
                    backgroundColor: "#1DA1F2",
                },

            }}
        >
            <TopTabs.Screen
                name="Default"
                component={AddDefault}
            />
            <TopTabs.Screen name="Custom" component={AddCustom} />
        </TopTabs.Navigator>
    )
}
