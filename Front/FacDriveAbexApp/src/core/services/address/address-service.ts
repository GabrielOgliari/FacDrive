import axios from 'axios';
import { Apis } from '../../constants/apis';
import { Address } from '../../models/address/address';

interface IAddressService {
  getAddressByCep(cep: number): Promise<Address>;
}

class AddressService implements IAddressService {
  async getAddressByCep(cep: number): Promise<Address> {
    const apiUrl = Apis.Address;

    const response = await axios<Address>({
      method: 'get',
      url: `${apiUrl}${cep}`,
    });

    return response.data;
  }
}

export default new AddressService();
