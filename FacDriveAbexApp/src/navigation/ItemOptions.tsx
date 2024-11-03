import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { height } from '../utils/dimensions.ts';
import { BottomRoutes } from './router.ts';

type ItemOptionsProps = {
    optionIndex: number;
};

export const ItemOptions = ({ optionIndex }: ItemOptionsProps): BottomTabNavigationOptions => {
    return {
        tabBarIcon: (props: { focused: boolean; color: string; size: number }) => (
            <Icon name={BottomRoutes.routes[optionIndex].icon} size={30} color={props.color} />
        ),
    };
};

export const screenOptions = (): BottomTabNavigationOptions => {
    return {
        headerShown: false,
        tabBarActiveTintColor: '#2375cc',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
            backgroundColor: '#ececec',
            height: height * 0.07,
            borderColor: '#d1d1d1',
        },
        tabBarShowLabel: false,
    };
};
