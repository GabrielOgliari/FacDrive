import axios from 'axios';
import {
  ValidStudentCardInput,
  ValidStudentCardOutput,
} from './models/validEstudantCard.ts';
import {toBase64} from '../utils/tobase64.ts';
interface IValidStudentCardService {
  valid(studentCard: File): Promise<ValidStudentCardOutput>;
}

class ValidStudentCardService implements IValidStudentCardService {
  async valid(studentCard: File): Promise<ValidStudentCardOutput> {
    const apiUrl =
      'https://b823ec66-6721-47c2-a272-dd9e978532df-00-2zppobftqj07f.riker.replit.dev:8080/imagem';
    const studentCardBase64 = await toBase64(studentCard);

    const response = await axios<ValidStudentCardInput>({
      method: 'post',
      url: apiUrl,
      data: {
        imagem: studentCardBase64,
      },
    });

    const {email, situacao, matricula, nascimento, cpf} = response.data;

    return {
      email,
      status: situacao,
      registration: matricula,
      birthDate: nascimento,
      cpf,
    };
  }
}

export default new ValidStudentCardService();
