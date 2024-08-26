import { GenderEnum } from '../../../enums/gender-enum';

export interface SaveSignUpData {
  user?: {
    cpf?: string;
    registration?: string; // Matrícula
    name?: string;
    surname?: string;
    birthDate?: string;
    driverLicense?: string;
    phone?: string;
    isDriver?: boolean;
    institutionalEmail?: string;
    password?: string;
    gender?: GenderEnum;
  };
  address?: {
    zipCode?: string;
    street?: string;
    neighborhood?: string;
    city?: string;
    number?: string;
    additionalInfo?: string;
    referencePoint?: string;
    state?: string;
  };
  vehicle?: {
    manufacturingYear?: string;
    modelYear?: string;
    color?: string;
    brand?: string;
    model?: string;
    plate?: string;
    city?: string;
    state?: string;
  };
}
