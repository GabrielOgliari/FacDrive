import { GenderEnum } from '../../../screens/SignUp/enums/gender-enum';
import { UserTypeEnum } from '../../../screens/SignUp/enums/user-type-enum';

export interface SaveSignUpData {
  accessData?: {
    institutionalEmail?: string;
    password?: string;
  };
  user?: {
    name?: string;
    surname?: string;
    birthDate?: Date;
    gender?: GenderEnum;
    cpf?: string;
    phone?: string;
    userType?: UserTypeEnum;
    isActiveStudent?: boolean;
    registration?: string;
  };
  address?: {
    zipCode?: string;
    state?: string;
    city?: string;
    complement?: string;
    neighborhood?: string;
    number?: string;
    street?: string;
  };
  vehicle?: {
    plate?: string;
    color?: string;
    manufacturingYear?: number;
    modelYear?: number;
    city?: string;
    state?: string;
  };
}
