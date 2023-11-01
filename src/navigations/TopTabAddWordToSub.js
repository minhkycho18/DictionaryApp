import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from 'react'
import AddCustom from "../components/YourWordList/AddWordToSub/Custom/AddCustom";
import AddDefault from "../components/YourWordList/AddWordToSub/Default/AddDefault";
import { useFonts } from "expo-font";
import { colors, configFont } from "~/constants/theme";
import { useRoute } from "@react-navigation/native";
export default function TopTabAddWordToSub(props) {
    const TopTabs = createMaterialTopTabNavigator();
    const [loaded] = useFonts(configFont);
    if (!loaded) {
        return null;
    }
    // const { params } = useRoute()
    const params = props.route.params
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
                    backgroundColor: "#4F62F7",
                },

            }}
        >
            <TopTabs.Screen
                name="Default"
                component={AddDefault}
                initialParams={params}
            />
            <TopTabs.Screen name="Custom" component={AddCustom} initialParams={params} />
        </TopTabs.Navigator>
    )
}
