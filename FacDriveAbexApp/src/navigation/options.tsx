import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { height } from '../utils/dimensions.ts';

const Icons = {
  dashboard: 'car-alt',
  routes: 'map-marked-alt',
  profile: 'user-graduate',
} as const;

type Icons = keyof typeof Icons;

type ItemOptionsProps = {
  route: { name: Icons };
};

export const ItemOptions = ({
  route,
}: ItemOptionsProps): BottomTabNavigationOptions => {
  return {
    tabBarIcon: (props: { focused: boolean; color: string; size: number }) => (
      <Icon name={Icons[route.name]} size={30} color={props.color} />
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
