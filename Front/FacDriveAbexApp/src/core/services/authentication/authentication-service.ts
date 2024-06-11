import axios from 'axios';
import { Apis } from '../../constants/apis';
import { UserCredentials } from '../../models/authentication/user-credentials';

type LoginProps = {
  email?: string;
  password?: string;
};

class AuthenticationService {
  async login({ email, password }: LoginProps): Promise<UserCredentials> {
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

export default new AuthenticationService();
