import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { stackRouter, bottomRoutes } from './router';
import {itemOptions, screenOptions} from "./options.tsx";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName={'dashboard'}>
            {bottomRoutes.routes.map(({ path, component }) => (
                <Tab.Screen key={path} name={path} component={component} options={itemOptions}/>
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
          <Stack.Screen  key={'BottonTabs'} name={"BottonTabs"} component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
