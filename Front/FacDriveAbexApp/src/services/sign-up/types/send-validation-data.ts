import { GenderEnum } from '../../../screens/SignUp/enums/gender-enum';

export interface SendValidationData {
  studentId: {
    email: string;
    status: string;
    registration: string;
    birthDate: string;
    cpf: string;
  };
  personalDetails: {
    name?: string;
    surname?: string;
    birthDate?: Date;
    gender?: GenderEnum;
    cpf?: string;
    phone?: string;
  };
}
