import { GenderEnum } from '../../../enums/gender-enum';

export type GetProfileDataInput = {
  usuario: {
    iduser: number;
    cpf: string;
    registration: string;
    name: string;
    surname: string;
    birthdate: string;
    driverlicense: string;
    phone: string;
    isdriver: boolean;
    institutionalemail: string;
    password: string;
    userimage: string;
    gender: GenderEnum;
  };
  endereco: {
    idaddress: number;
    iduser: number;
    zipcode: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    additionalinfo: string;
    referencepoint: string;
    state: string;
  };
  veiculo: {
    idvehicle: number;
    iduser: number;
    manufacturingyear: string;
    modelyear: string;
    color: string;
    brand: string;
    model: string;
    plate: string;
    city: string;
    state: string;
  };
};
