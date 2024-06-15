import axios from 'axios';
import { makeApi } from '../../../helpers/make-api';
import { SaveSignUpData } from './types/save-sign-up-data';

class Name {
  async saveSignUpData(data: SaveSignUpData) {
    const apiUrl = makeApi('banco');

    const response = await axios({
      method: 'post',
      url: apiUrl,
      data,
    });
    return response.data;
  }
}

export default new Name();
