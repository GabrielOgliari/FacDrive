import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ItemOptions, screenOptions } from './ItemOptions.tsx';
import { BottomRoutes, StackRouter } from './router';
import {useUser} from "../context/useUser.tsx";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName={BottomRoutes.initialRoute}>
            {BottomRoutes.routes.map(({ path, component }, optionIndex) => (
                <Tab.Screen key={path} name={path} component={component} options={() => ItemOptions({ optionIndex })} />
            ))}
        </Tab.Navigator>
    );
};

export const Navigator = () => {
    const user = useUser();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={user.user.id ? 'bottom-tabs' : StackRouter.initialRoute} screenOptions={{ headerShown: false }}>
                {StackRouter.routes.map(({ path, component }) => (
                    <Stack.Screen key={path} name={path} component={component} />
                ))}
                <Stack.Screen name="bottom-tabs" component={BottomTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
