import { ChartData } from './chart-data.model';

export interface StatisticModelFromServer {
  voltage?: number;
  duration?: string;
  totalNumber?: number;
  chart?: ChartData;
}

export interface StatisticModel
  extends Omit<StatisticModelFromServer, 'duration'> {
  duration: string;
}
