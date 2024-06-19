import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Presentation } from '../screens/Presentation';
import { AccessData } from '../screens/SignUp/AccessData';
import { Address } from '../screens/SignUp/Address';
import { PersonalDetails } from '../screens/SignUp/PersonalDetails';
import { StudentId } from '../screens/SignUp/StudentId';
import { UserType } from '../screens/SignUp/UserType';
import { Vehicle } from '../screens/SignUp/Vehicle';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PRESENTATION"
        screenOptions={{ headerShown: false }}
      >
        {/* Presentation */}

        <Stack.Screen name="PRESENTATION" component={Presentation} />

        {/* SignUp */}

        <Stack.Screen name="ACCESS_DATA" component={AccessData} />

        <Stack.Screen name="USER_TYPE" component={UserType} />

        <Stack.Screen name="STUDENT_ID" component={StudentId} />

        <Stack.Screen name="PERSONAL_DETAILS" component={PersonalDetails} />

        <Stack.Screen name="ADDRESS" component={Address} />

        <Stack.Screen name="VEHICLE" component={Vehicle} />

        {/* Login */}

        <Stack.Screen name="LOGIN" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
