import axios from 'axios'
import { Address } from '../models/address'

interface IAddressService {
  getAddressByCep(cep: number): Promise<Address>
}

class AddressService implements IAddressService {
  async getAddressByCep(cep: number): Promise<Address> {
    const apiUrl = import.meta.env.VITE_ADDRESS_API

    const response = await axios<Address>({
      method: 'get',
      url: `${apiUrl}${cep}`,
    })

    return response.data
  }
}

export default new AddressService()
