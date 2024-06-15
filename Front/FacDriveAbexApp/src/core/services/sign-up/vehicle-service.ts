import axios from 'axios';
import { makeApi } from '../../../helpers/make-api';
import { VehicleInput, VehicleResponse } from './types/vehicle';

class VehicleService {
  async vehicleByPlate(plate: string): Promise<VehicleResponse> {
    const apiUrl = makeApi('veiculo');

    const { data } = await axios<VehicleInput>({
      method: 'post',
      url: apiUrl,
      data: {
        placa: plate,
      },
    });

    return {
      brand: data['Marca:'],
      model: data['Modelo:'],
      imported: data['Importado:'],
      modelYear: data['Ano Modelo:'],
      manufacturingYear: data['Ano:'],
      color: data['Cor:'],
      fuel: data['Combustível:'],
      engineCapacity: data['Cilindrada:'],
      power: data['Potencia:'],
      chassis: data['Chassi:'],
      engine: data['Motor:'],
      passengers: data['Passageiros:'],
      stateAcronym: data['UF:'],
      state: data['Estado:'],
      city: data['Município:'],
    };
  }
}

export default new VehicleService();
