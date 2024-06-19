import axios from 'axios';
import { makeApi } from '../../helpers/makeApi';
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
  async verifyEmailAlreadyRegistered(
    email: string,
  ): Promise<ValidateEmailResponse> {
    const apiUrl = makeApi('validacao_email');

    const { data } = await axios({
      method: 'post',
      url: apiUrl,
      data: {
        email,
      },
    });

    return {
      emailAlreadyRegistered: data.emailAlreadyRegistered,
    };
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
      complement: data.complemento,
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
    const apiUrl = makeApi('image');

    const response = await axios<ValidStudentIdInput>({
      method: 'post',
      url: apiUrl,
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
    const apiUrl = makeApi('validacao_estudante');

    await axios<ValidStudentIdInput>({
      method: 'post',
      url: apiUrl,
      data,
    });
  }

  async vehicleByPlate(plate?: string): Promise<VehicleResponse> {
    const apiUrl = makeApi('veiculo');

    const { data } = await axios<VehicleInput>({
      method: 'post',
      url: apiUrl,
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
    const apiUrl = makeApi('validacao_carro');

    const { data } = await axios<{ plateAlreadyRegistered: boolean }>({
      method: 'post',
      url: apiUrl,
      data: {
        plate,
      },
    });

    return {
      plateAlreadyRegistered: data.plateAlreadyRegistered,
    };
  }

  async save(data: SaveSignUpData) {
    const apiUrl = makeApi('banco');

    await axios({
      method: 'post',
      url: apiUrl,
      data,
    });
  }
}

export default new SignUpService();
