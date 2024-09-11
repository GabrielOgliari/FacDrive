import axios from 'axios';
import { GetCarpoolDaysInput } from './types/get-carpool-days-input';
import { GetCarpoolDaysOutput } from './types/get-carpool-days-output';
import { GetPerfilImageInput } from './types/get-perfil-image-input';
import { GetPerfilImageOutput } from './types/get-perfil-image-output';
import { SetPerfilImageParams } from './types/set-perfil-image-params';
import { SetPerfilImageResponse } from './types/set-perfil-image-response';

interface IDashboardService {
  confirmRide({ confirmation }: { confirmation: boolean }): Promise<any>;
}

class DashboardService implements IDashboardService {
  protected apiNodeUrl = process.env.API_NODE_URL;

  async confirmRide({ confirmation }: { confirmation: boolean }) {
    const response = await axios({
      method: 'post',
      url: this.apiNodeUrl,
      data: {
        confirmation,
      },
    });

    return response.data;
  }

  async getCarpoolDays(id: number): Promise<GetCarpoolDaysOutput> {
    const response = await axios<GetCarpoolDaysInput>({
      method: 'get',
      url: this.apiNodeUrl,
      data: {
        id,
      },
    });

    return response.data;
  }

  async getPerfilImage(id: number): Promise<GetPerfilImageOutput> {
    const endpoint = '/image';

    const { data } = await axios<GetPerfilImageInput>({
      method: 'get',
      url: this.apiNodeUrl + endpoint + '/' + id,
    });

    return {
      userImage: data.userimage,
    };
  }

  async setPerfilImage({
    id,
    image,
  }: SetPerfilImageParams): Promise<SetPerfilImageResponse> {
    const endpoint = '/image';

    const { data } = await axios<SetPerfilImageResponse>({
      method: 'post',
      url: this.apiNodeUrl + endpoint,
      data: {
        idUser: id,
        userImage: image,
      },
    });

    return {
      success: data.success,
    };
  }
}

export default new DashboardService();
