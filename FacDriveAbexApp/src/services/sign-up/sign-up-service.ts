import axios from 'axios';
import { AddressInput, AddressResponse } from './types/address';
import { SaveSignUpData } from './types/save-sign-up-data';
import { SendValidationData } from './types/send-validation-data';
import {
  ValidStudentIdInput,
  ValidStudentIdResponse,
} from './types/valid-student-id';
import { ValidateEmailResponse } from './types/validate-email';
import { VehicleInput, VehicleResponse } from './types/vehicle';

class SignUpService {
  protected apiUrlBase = process.env.API_BASE_URL;
  protected apiUrlPersistence = process.env.API_PERSISTENCE_URL;

  async verifyEmailAlreadyRegistered(
    email: string,
  ): Promise<ValidateEmailResponse> {
    const endpoint = '/validacao_email';
    const response = await axios({
      method: 'post',
      url: this.apiUrlBase + endpoint,
      data: {
        email,
      },
    });

    const { emailAlreadyRegistered } = response.data;

    return { emailAlreadyRegistered };
  }

  async getAddressByZipCode(zipCode: string): Promise<AddressResponse> {
    const apiUrl = `https://viacep.com.br/ws/${zipCode}/json/`;

    const { data } = await axios<AddressInput>({
      method: 'get',
      url: apiUrl,
    });

    return {
      zipCode: data.cep,
      street: data.logradouro,
      additionalInfo: data.complemento,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
      ibge: data.ibge,
      gia: data.gia,
      ddd: data.ddd,
      siafi: data.siafi,
    };
  }

  async validStudentId(studentId: string): Promise<ValidStudentIdResponse> {
    const endpoint = '/image';

    const response = await axios<ValidStudentIdInput>({
      method: 'post',
      url: this.apiUrlBase + endpoint,
      data: {
        imagem: studentId,
      },
    });

    const { email, situacao, matricula, nascimento, cpf } = response.data;

    return {
      email,
      status: situacao,
      registration: matricula,
      birthDate: nascimento,
      cpf,
    };
  }

  async sendValidationData(data: SendValidationData) {
    const endpoint = '/validacao_estudante';

    await axios<ValidStudentIdInput>({
      method: 'post',
      url: this.apiUrlBase + endpoint,
      data,
    });
  }

  async vehicleByPlate(plate?: string): Promise<VehicleResponse> {
    const endpoint = '/veiculo';

    const { data } = await axios<VehicleInput>({
      method: 'post',
      url: this.apiUrlBase + endpoint,
      data: {
        plate,
      },
    });

    return {
      brand: data['Marca:'],
      model: data['Modelo:'],
      imported: data['Importado:'],
      modelYear: data['Ano Modelo:'],
      manufacturingYear: data['Ano:'],
      color: data['Cor:'],
      fuel: data['Combustível:'],
      engineCapacity: data['Cilindrada:'],
      power: data['Potencia:'],
      chassis: data['Chassi:'],
      engine: data['Motor:'],
      passengers: data['Passageiros:'],
      stateAcronym: data['UF:'],
      state: data['Estado:'],
      city: data['Município:'],
    };
  }

  async verifyVehicleHasAlreadyRegistered(
    plate?: string,
  ): Promise<{ plateAlreadyRegistered: boolean }> {
    const endpoint = '/validacao_carro';

    const { data } = await axios<{ plateAlreadyRegistered: boolean }>({
      method: 'post',
      url: this.apiUrlBase + endpoint,
      data: {
        plate,
      },
    });

    return {
      plateAlreadyRegistered: data.plateAlreadyRegistered,
    };
  }

  async save(data: SaveSignUpData) {
    const endpoint = '/insersao';

    return await axios({
      method: 'post',
      url: this.apiUrlPersistence + endpoint,
      data,
    });
  }
}

export default new SignUpService();
