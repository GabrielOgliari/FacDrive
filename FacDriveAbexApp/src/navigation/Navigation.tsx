import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { itemOptions, screenOptions } from './options.tsx';
import { bottomRoutes, stackRouter } from './router';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName={'dashboard'}>
      {bottomRoutes.routes.map(({ path, component }) => (
        <Tab.Screen
          key={path}
          name={path}
          component={component}
          options={itemOptions}
        />
      ))}
    </Tab.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'presetation'}
        screenOptions={{ headerShown: false }}
      >
        {stackRouter.routes.map(({ path, component }) => (
          <Stack.Screen key={path} name={path} component={component} />
        ))}
        <Stack.Screen
          key={'BottonTabs'}
          name={'BottonTabs'}
          component={BottomTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
