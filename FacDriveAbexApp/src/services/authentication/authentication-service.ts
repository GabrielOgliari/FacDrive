import axios from 'axios';
import { LoginParams } from './types/login-params';
import { LoginResponse } from './types/login-response';

class AuthenticationService {
  protected apiNodeUrl = process.env.API_NODE_URL;

  async login({ email, password }: LoginParams): Promise<LoginResponse> {
    const endpoint = '/login';

    const { data } = await axios<LoginResponse>({
      method: 'post',
      url: this.apiNodeUrl + endpoint,
      data: {
        email,
        password,
      },
    });

    const { success, userId, message } = data;

    return { success, userId, message };
  }
}

export default new AuthenticationService();
