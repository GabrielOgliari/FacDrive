/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { Apis } from '../../constants/apis';
import { Register } from '../../models/register/register';

interface IRegisterService {
  save(data: Register): Promise<any>;
}

class RegisterService implements IRegisterService {
  async save(data: Register) {
    const apiUrl = Apis.Register;

    const response = await axios({
      method: 'post',
      url: apiUrl,
      data,
    });
    return response.data;
  }
}

export default new RegisterService();
