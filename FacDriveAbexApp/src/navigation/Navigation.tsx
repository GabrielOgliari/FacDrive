import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { router } from './router';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={router.initialRoute}
        screenOptions={{ headerShown: false }}
      >
        {router.routes.map(({ path, component }) => (
          <Stack.Screen key={path} name={path} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
