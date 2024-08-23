import axios from 'axios';
import { AddressInput, AddressResponse } from './types/address';
import { SaveSignUpData } from './types/save-sign-up-data';
import {
  ValidStudentIdInput,
  ValidStudentIdResponse,
} from './types/valid-student-id';
import { ValidateEmailResponse } from './types/validate-email';
import { VehicleInput, VehicleResponse } from './types/vehicle';

class SignUpService {
  protected apiPythonUrl = process.env.API_PYTHON_URL;
  protected apiNodeUrl = process.env.API_NODE_URL;

  async verifyEmailAlreadyRegistered(
    email: string,
  ): Promise<ValidateEmailResponse> {
    const endpoint = '/validations/email/';

    const response = await axios({
      method: 'get',
      url: this.apiNodeUrl + endpoint + email,
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
      method: 'POST', // Não faço ideia por que precisa ser maiúsculo
      url: this.apiPythonUrl + endpoint,
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

  async verifyCpfAlreadyRegistered(cpf: string): Promise<boolean> {
    const endpoint = '/validations/cpf/';

    const { data } = await axios<{ cpfAlreadyRegistered: boolean }>({
      method: 'get',
      url: this.apiNodeUrl + endpoint + cpf,
    });

    return data.cpfAlreadyRegistered;
  }

  async vehicleByPlate(plate?: string): Promise<VehicleResponse> {
    const endpoint = '/veiculo';

    const { data } = await axios<VehicleInput>({
      method: 'post',
      url: this.apiPythonUrl + endpoint,
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
    plate: string,
  ): Promise<{ plateAlreadyRegistered: boolean }> {
    const endpoint = '/validations/plate/';

    const { data } = await axios<{ plateAlreadyRegistered: boolean }>({
      method: 'get',
      url: this.apiNodeUrl + endpoint + plate,
    });

    return {
      plateAlreadyRegistered: data.plateAlreadyRegistered,
    };
  }

  async save(data: SaveSignUpData) {
    const endpoint = '/register';

    return await axios({
      method: 'post',
      url: this.apiNodeUrl + endpoint,
      data,
    });
  }
}

export default new SignUpService();
