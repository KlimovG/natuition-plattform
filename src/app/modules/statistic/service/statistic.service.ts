import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { StatisticModelFromServer } from '../models/statistic.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_STATISTIC = `
  query GetRobotStats($session: Float!) {
    getRobotStats(session: $session) {
      voltage
      duration
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
      .query<{ getRobotStats: StatisticModelFromServer }>({
        query: gql(GET_STATISTIC),
        variables: {
          session,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getRobotStats: StatisticModelFromServer;
            }>
          ) => {
            return result.data.getRobotStats;
          }
        )
      );
  }
}
