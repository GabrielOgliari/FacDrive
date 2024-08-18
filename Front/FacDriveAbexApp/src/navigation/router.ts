import { LoginScreen } from '../screens/login';
import { PresentationScreen } from '../screens/presentation';
import { AccessDataScreen } from '../screens/sign-up/access-data';
import { AddressScreen } from '../screens/sign-up/address';
import { PersonalDetailsScreen } from '../screens/sign-up/personal-details';
import { StudentIdScreen } from '../screens/sign-up/student-id';
import { UserTypeScreen } from '../screens/sign-up/user-type';
import { VehicleScreen } from '../screens/sign-up/vehicle';

export const router = {
  initialRoute: 'presentation',
  routes: [
    { path: 'presentation', component: PresentationScreen },
    { path: 'access-data', component: AccessDataScreen },
    { path: 'user-type', component: UserTypeScreen },
    { path: 'student-id', component: StudentIdScreen },
    { path: 'personal-details', component: PersonalDetailsScreen },
    { path: 'address', component: AddressScreen },
    { path: 'vehicle', component: VehicleScreen },
    { path: 'login', component: LoginScreen },
  ],
};
