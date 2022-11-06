import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { StatisticDto } from '../models/statistic.dto';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_STATISTIC = `
  query GetRobotStats($session: Float!) {
    getRobotStats(session: $session) {
      voltage
      duration {
        hours
        minutes
      }
      totalNumber
      chart {
        data
        labels
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private apollo: Apollo) {}

  getStatistic(session: number) {
    return this.apollo
      .query<{ getRobotStats: StatisticDto }>({
        query: gql(GET_STATISTIC),
        variables: {
          session,
        },
      })
      .pipe(
        map((result: ApolloQueryResult<{ getRobotStats: StatisticDto }>) => {
          return result.data.getRobotStats;
        })
      );
  }
}
