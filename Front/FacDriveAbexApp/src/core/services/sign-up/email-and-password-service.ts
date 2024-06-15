import axios from 'axios';
import { makeApi } from '../../../helpers/make-api';
import { ValidateEmailResponse } from './types/validate-email';

class EmailAndPasswordService {
  async validateEmail(email: string): Promise<ValidateEmailResponse> {
    const apiUrl = makeApi('validacao_email');

    const { data } = await axios({
      method: 'post',
      url: apiUrl,
      data: {
        email,
      },
    });

    return {
      emailAlreadyRegistered: data.emailAlreadyRegistered,
    };
  }
}

export default new EmailAndPasswordService();
