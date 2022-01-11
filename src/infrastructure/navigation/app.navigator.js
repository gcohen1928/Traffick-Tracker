import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MapScreen } from "../../features/map/screens/map.screen";
import { colors } from "../theme/colors";
import { LocationSearchContextProvider } from "../../services/location-search/location-search.context";
import { ReportNavigator } from "./report.navigator";

const Tab = createBottomTabNavigator()

const TAB_ICON = {
    Map: 'map-outline',
    Report: 'hand-left-outline'
}

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name]
    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.brand.secondary,
        headerShown: false,
    }
}


export const AppNavigator = () => {
    return (
        <LocationSearchContextProvider>
            <NavigationContainer>
                <Tab.Navigator screenOptions={createScreenOptions} >
                    <Tab.Screen name="Map" component={MapScreen} />
                    <Tab.Screen name="Report" component={ReportNavigator} />
                </Tab.Navigator>
            </NavigationContainer>
        </LocationSearchContextProvider>
    )
}