import axios from 'axios';
import { GetCarpoolDaysInput } from './types/get-carpool-days-input';
import { GetCarpoolDaysOutput } from './types/get-carpool-days-output';

interface IDashboardService {
  confirmRide({ confirmation }: { confirmation: boolean }): Promise<any>;
}

class DashboardService implements IDashboardService {
  async confirmRide({ confirmation }: { confirmation: boolean }) {
    const apiUrl = '';

    const response = await axios({
      method: 'post',
      url: apiUrl,
      data: {
        confirmation,
      },
    });

    return response.data;
  }

  async getCarpoolDays(id: number): Promise<GetCarpoolDaysOutput> {
    const apiUrl = '';

    const response = await axios<GetCarpoolDaysInput>({
      method: 'get',
      url: apiUrl,
      data: {
        id,
      },
    });

    return response.data;
  }
}

export default new DashboardService();
