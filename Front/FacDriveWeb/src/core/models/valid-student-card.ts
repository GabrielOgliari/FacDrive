export interface ValidStudentCardInput {
  email: string
  situacao: string
  matricula: string
  nascimento: string
  cpf: string
}

export interface ValidStudentCardOutput {
  email: string
  status: string
  registration: string
  birthDate: string
  cpf: string
}
