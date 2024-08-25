import axios from 'axios';
import { LoginParams } from './types/login-params';
import { LoginResponse } from './types/login-response';

class AuthenticationService {
  protected apiNodeUrl = process.env.API_NODE_URL;

  async login({ email, password }: LoginParams): Promise<LoginResponse> {
    const endpoint = '/login';

    const response = await axios<LoginResponse>({
      method: 'post',
      url: this.apiNodeUrl + endpoint,
      data: {
        email,
        password,
      },
    });

    const { success, userId } = response.data;

    return { success, userId };
  }
}

export default new AuthenticationService();
