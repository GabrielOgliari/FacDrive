import axios from 'axios';
import { Apis } from '../../constants/apis';
import {
  ValidStudentIdInput,
  ValidStudentIdOutput,
} from '../../models/valid-student-id/valid-student-id';

interface IValidStudentIdService {
  valid(studentId: any): Promise<ValidStudentIdOutput>;
}

class ValidStudentIdService implements IValidStudentIdService {
  async valid(studentId: any): Promise<ValidStudentIdOutput> {
    const apiUrl = Apis.ValidStudentId;

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
