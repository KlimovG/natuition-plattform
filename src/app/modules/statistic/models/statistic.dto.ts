import { ChartData } from './chart-data.model';
import { DurationObjectUnits } from 'luxon';

export class StatisticDto {
  voltage?: number;
  duration?: DurationObjectUnits;
  totalNumber?: number;
  chart?: ChartData;
}
