import axios from 'axios'
import {
  ValidStudentCardInput,
  ValidStudentCardOutput,
} from '../models/valid-student-card'
import { toBase64 } from '../../utils/helpers/toBase64'

interface IValidStudentCardService {
  valid(studentCard: File): Promise<ValidStudentCardOutput>
}

class ValidStudentCardService implements IValidStudentCardService {
  async valid(studentCard: File): Promise<ValidStudentCardOutput> {
    const apiUrl = import.meta.env.VITE_VALID_STUDENT_CARD_API
    const studentCardBase64 = await toBase64(studentCard)

    const response = await axios<ValidStudentCardInput>({
      method: 'post',
      url: apiUrl,
      data: {
        imagem: studentCardBase64,
      },
    })

    const { email, situacao, matricula, nascimento, cpf } = response.data

    return {
      email,
      status: situacao,
      registration: matricula,
      birthDate: nascimento,
      cpf,
    }
  }
}

export default new ValidStudentCardService()
