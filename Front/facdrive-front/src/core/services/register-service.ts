/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { Register } from '../models/register'

interface IRegisterService {
  save(data: Register): Promise<any>
}

class RegisterService implements IRegisterService {
  async save(data: Register) {
    const apiUrl = import.meta.env.VITE_REGISTER_API

    const response = await axios({
      method: 'post',
      url: apiUrl,
      data,
    })
    return response.data
  }
}

export default new RegisterService()
