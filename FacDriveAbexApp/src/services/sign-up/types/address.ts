export interface AddressResponse {
  zipCode: string;
  street: string;
  additionalInfo: string; // Complemento
  neighborhood: string;
  city: string;
  state: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface AddressInput {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}
