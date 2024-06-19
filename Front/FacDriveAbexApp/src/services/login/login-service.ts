import axios from 'axios';
import { Apis } from '../../constants/apis';
import { LoginResponse } from './types/login-response';

class LoginService {
  async authentication(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const apiUrl = Apis.Authentication;

    return await axios({
      method: 'post',
      url: apiUrl,
      data: {
        email,
        password,
      },
    });
  }
}

export default new LoginService();
