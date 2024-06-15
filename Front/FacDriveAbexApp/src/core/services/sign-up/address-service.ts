import axios from 'axios';
import { AddressResponse } from './types/address';

class AddressService {
  async getAddressByCep(cep: string): Promise<AddressResponse> {
    const apiUrl = 'https://brasilapi.com.br/api/cep/v1/';

    const response = await axios({
      method: 'get',
      url: `${apiUrl}${cep}`,
    });

    return response.data;
  }
}

export default new AddressService();
