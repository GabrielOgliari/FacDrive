import axios from 'axios';
import { LoginResponse } from './types/login-response';

class LoginService {
  async authentication(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const apiUrl = '';

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
