import axios from 'axios';
import { DaysOfTheWeek } from '../../enums/days-of-the-week';
import { CarpoolDaysParams } from './types/carpool-days-params';
import { GetCarpoolDaysInput } from './types/get-carpool-days-input';
import { GetCarpoolDaysOutput } from './types/get-carpool-days-output';

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

  async getCarpoolDays(id?: number): Promise<GetCarpoolDaysOutput> {
    const endpoint = '/classdays/id';

    const response = await axios<GetCarpoolDaysInput[]>({
      method: 'get',
      url: this.apiNodeUrl + endpoint + '/' + id,
    });

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

  async createCarpoolDays({ id, days }: CarpoolDaysParams) {
    const endpoint = '/classdays';

    days.some(({ value }) => value === DaysOfTheWeek.Monday);

    await axios<GetCarpoolDaysInput>({
      method: 'post',
      url: this.apiNodeUrl + endpoint,
      data: {
        idUser: id,
        monday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Monday && active,
        ),
        tuesday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Tuesday && active,
        ),
        wednesday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Wednesday && active,
        ),
        thursday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Thursday && active,
        ),
        friday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Friday && active,
        ),
        saturday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Saturday && active,
        ),
      },
    });
  }

  async updateCarpoolDays({ id, days }: CarpoolDaysParams) {
    const endpoint = '/classdays';

    console.log(days);

    await axios<GetCarpoolDaysInput>({
      method: 'put',
      url: this.apiNodeUrl + endpoint + '/' + id,
      data: {
        monday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Monday && active,
        ),
        tuesday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Tuesday && active,
        ),
        wednesday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Wednesday && active,
        ),
        thursday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Thursday && active,
        ),
        friday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Friday && active,
        ),
        saturday: days.some(
          ({ value, active }) => value === DaysOfTheWeek.Saturday && active,
        ),
      },
    });
  }
}

export default new DashboardService();
