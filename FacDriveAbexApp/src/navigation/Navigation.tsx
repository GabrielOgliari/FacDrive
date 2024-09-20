import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ItemOptions, screenOptions } from './options.tsx';
import { bottomRoutes, stackRouter } from './router';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName={bottomRoutes.initialRoute}
    >
      {bottomRoutes.routes.map(({ path, component }) => (
        <Tab.Screen
          key={path}
          name={path}
          component={component}
          options={ItemOptions}
        />
      ))}
    </Tab.Navigator>
  );
};

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={stackRouter.initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {stackRouter.routes.map(({ path, component }) => (
          <Stack.Screen key={path} name={path} component={component} />
        ))}
        <Stack.Screen
          key="BottomTabs"
          name="BottomTabs"
          component={BottomTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
