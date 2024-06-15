export interface ValidStudentIdInput {
  email: string;
  situacao: string;
  matricula: string;
  nascimento: string;
  cpf: string;
}

export interface ValidStudentIdResponse {
  email: string;
  status: string;
  registration: string;
  birthDate: string;
  cpf: string;
}
