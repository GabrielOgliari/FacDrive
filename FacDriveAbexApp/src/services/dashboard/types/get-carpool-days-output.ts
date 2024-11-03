import { DaysOfTheWeek } from '../../../enums/days-of-the-week';

export type GetCarpoolDaysOutput = {
    day: string;
    active: boolean;
    value: DaysOfTheWeek;
}[];
