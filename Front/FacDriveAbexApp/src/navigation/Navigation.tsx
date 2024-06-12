import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login';
import { Presentation } from '../screens/Presentation';
import { AddressRegistrationScreen } from '../screens/SignUp/AddressRegistrationScreen';
import { EmailAndPasswordRegistrationScreen } from '../screens/SignUp/EmailAndPasswordRegistrationScreen';
import { PersonalDetailsRegistrationScreen } from '../screens/SignUp/PersonalDetailsRegistrationScreen';
import { StudentIdValidationScreen } from '../screens/SignUp/StudentIdValidationScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Presentation"
        screenOptions={{ headerShown: false }}
      >
        {/* Presentation */}

        <Stack.Screen name="Presentation" component={Presentation} />

        {/* SignUp */}

        <Stack.Screen
          name="EmailAndPasswordRegistration"
          component={EmailAndPasswordRegistrationScreen}
        />

        <Stack.Screen
          name="AddressRegistration"
          component={AddressRegistrationScreen}
        />

        <Stack.Screen
          name="PersonalDetailsRegistration"
          component={PersonalDetailsRegistrationScreen}
        />

        <Stack.Screen
          name="StudentIdValidation"
          component={StudentIdValidationScreen}
        />

        {/* Login */}

        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
