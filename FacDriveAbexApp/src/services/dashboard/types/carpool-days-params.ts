import { DaysOfTheWeek } from '../../../enums/days-of-the-week';

export type CarpoolDaysParams = {
  id: number;
  day: keyof typeof DaysOfTheWeek;
};
