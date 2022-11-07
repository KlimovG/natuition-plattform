import { ChartData } from './chart-data.model';
import { DurationObjectUnits } from 'luxon';

export interface StatisticModelFromServer {
  voltage?: number;
  duration?: DurationObjectUnits;
  totalNumber?: number;
  chart?: ChartData;
}

export interface StatisticModel
  extends Omit<StatisticModelFromServer, 'duration'> {
  duration: string;
}
