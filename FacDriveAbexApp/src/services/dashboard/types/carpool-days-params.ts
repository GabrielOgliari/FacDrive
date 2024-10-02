import { DaysOfTheWeek } from '../../../enums/days-of-the-week';

export type Days = { day: string; active: boolean; value: DaysOfTheWeek }[];

export type CarpoolDaysParams = {
  id?: number;
  days: Days;
};
