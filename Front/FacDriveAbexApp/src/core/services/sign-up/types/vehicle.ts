export interface VehicleInput {
  'Marca:': string;
  'Modelo:': string;
  'Importado:': string;
  'Ano Modelo:': string;
  'Ano:': string;
  'Cor:': string;
  'Combustível:': string;
  'Cilindrada:': string;
  'Potencia:': string;
  'Chassi:': string;
  'Motor:': string;
  'Passageiros:': string;
  'UF:': string;
  'Estado:': string;
  'Município:': string;
}

export interface VehicleResponse {
  brand: string;
  model: string;
  imported: string;
  modelYear: string;
  manufacturingYear: string;
  color: string;
  fuel: string;
  engineCapacity: string;
  power: string;
  chassis: string;
  engine: string;
  passengers: string;
  stateAcronym: string;
  state: string;
  city: string;
}
