import axios from 'axios';
import { GetProfileDataInput } from './types/get-profile-data-input';
import { GetProfileDataOutput } from './types/get-profile-data-output';

class ProfileService {
  protected apiNodeUrl = process.env.API_NODE_URL;

  async getProfileData(id?: number): Promise<GetProfileDataOutput> {
    const endpoint = '/user';

    const response = await axios<GetProfileDataInput>({
      method: 'get',
      url: this.apiNodeUrl + endpoint + '/' + id,
    });

    const { data } = response;

    return {
      id: data.usuario.iduser,
      isDriver: data.usuario.isdriver,
      fullName: `${data.usuario.name} ${data.usuario.surname}`,
      address: `${data.endereco.street}, ${data.endereco.number}`,
      image: data.usuario.userimage,
      birthDate: data.usuario.birthdate,
      vehicle: `${data.veiculo.model} - ${data.veiculo.brand}`,
    };
  }
}

export default new ProfileService();
