import axios from 'axios';
import { DaysOfTheWeek } from '../../enums/days-of-the-week';
import { CarpoolDaysParams } from './types/carpool-days-params';
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
    const endpoint = '/classdays/id';

    const response = await axios<GetCarpoolDaysInput[]>({
      method: 'get',
      url: this.apiNodeUrl + endpoint + '/' + 79,
    });

    console.log('end', this.apiNodeUrl + endpoint + '/' + 79);

    const { data } = response;

    return [
      { day: 'Seg', active: data[0].monday, value: DaysOfTheWeek.Monday },
      { day: 'Ter', active: data[0].tuesday, value: DaysOfTheWeek.Tuesday },
      { day: 'Qua', active: data[0].wednesday, value: DaysOfTheWeek.Wednesday },
      { day: 'Qui', active: data[0].thursday, value: DaysOfTheWeek.Thursday },
      { day: 'Sex', active: data[0].friday, value: DaysOfTheWeek.Friday },
      { day: 'Sáb', active: data[0].saturday, value: DaysOfTheWeek.Saturday },
    ];
  }

  async createCarpoolDays({ id, day }: CarpoolDaysParams) {
    const endpoint = '/classdays';

    await axios<GetCarpoolDaysInput>({
      method: 'post',
      url: this.apiNodeUrl + endpoint + '/' + id,
      data: {
        monday: day === DaysOfTheWeek.Monday,
        tuesday: day === DaysOfTheWeek.Tuesday,
        wednesday: day === DaysOfTheWeek.Wednesday,
        thursday: day === DaysOfTheWeek.Thursday,
        friday: day === DaysOfTheWeek.Friday,
        saturday: day === DaysOfTheWeek.Saturday,
      },
    });
  }

  async updateCarpoolDays({ id, day }: CarpoolDaysParams) {
    const endpoint = '/classdays';

    await axios<GetCarpoolDaysInput>({
      method: 'put',
      url: this.apiNodeUrl + endpoint + '/' + id,
      data: {
        monday: day === DaysOfTheWeek.Monday,
        tuesday: day === DaysOfTheWeek.Tuesday,
        wednesday: day === DaysOfTheWeek.Wednesday,
        thursday: day === DaysOfTheWeek.Thursday,
        friday: day === DaysOfTheWeek.Friday,
        saturday: day === DaysOfTheWeek.Saturday,
      },
    });
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
