import axios from 'axios';
import { makeApi } from '../../../helpers/make-api';
import {
  ValidStudentIdInput,
  ValidStudentIdResponse,
} from './types/valid-student-id';

class ValidStudentIdService {
  async validStudentId(studentId: string): Promise<ValidStudentIdResponse> {
    const apiUrl = makeApi('image');

    const response = await axios<ValidStudentIdInput>({
      method: 'post',
      url: apiUrl,
      data: {
        imagem: studentId,
      },
    });

    const { email, situacao, matricula, nascimento, cpf } = response.data;

    return {
      email,
      status: situacao,
      registration: matricula,
      birthDate: nascimento,
      cpf,
    };
  }
}

export default new ValidStudentIdService();
