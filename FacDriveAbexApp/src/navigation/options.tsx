import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {height} from "../utils/dimensions.ts";

const whatIcon = (IconName : string): string => {
    switch (IconName){
        case "dashboard": return "car-alt"
        case "rotes": return "map-marked-alt"
        case "profile": return "user-graduate"
        default: return IconName
    }
}
export const itemOptions = ({ route }:{route: {name: string}}): BottomTabNavigationOptions => {
    return {
        tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number; }) =>
            <Icon name={whatIcon(route.name)} size={30} color={props.color} />
    }
}

export const screenOptions = () : BottomTabNavigationOptions => {

    return {
        headerShown: false,
        tabBarActiveTintColor: "#2375cc",
        tabBarInactiveTintColor: "#000000",
        tabBarStyle: {
            backgroundColor: "#ececec",
            height: height * 0.07,
            borderColor: "#d1d1d1",
        },
        tabBarShowLabel: false,
    };
};
