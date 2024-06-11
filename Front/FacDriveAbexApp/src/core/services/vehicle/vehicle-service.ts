import axios from 'axios';
import { Apis } from '../../constants/apis';
import { VehicleInput, VehicleOutput } from '../../models/vehicle/vehicle';

interface IVehicleService {
  vehicleByPlate(plate: string): Promise<VehicleOutput>;
}

class VehicleService implements IVehicleService {
  async vehicleByPlate(plate: string): Promise<VehicleOutput> {
    const apiUrl = Apis.Vehicle;

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
