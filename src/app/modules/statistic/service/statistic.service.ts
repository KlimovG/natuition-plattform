import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { StatisticModel } from '../models/statistic.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_SESSIONS_FOR_ROBOT = `
  query ($serial: String!) {
    getSessionsForRobot(serial: $serial) {
      id
      startTime
      endTime
      prevSessionId
      fieldId
      statistic {
        id
        sessionId
        voltage
        timestamp
      }
      extractedWeeds {
        id
        pointPath
        weedType
        sessionId
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private apollo: Apollo) {}

  getSessionsForRobot(serial: string) {
    return this.apollo
      .query<{ getSessionsForRobot: StatisticModel[] }>({
        query: gql(GET_SESSIONS_FOR_ROBOT),
        variables: {
          serial,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{ getSessionsForRobot: StatisticModel[] }>
          ) => {
            return result.data.getSessionsForRobot;
          }
        )
      );
  }
}
