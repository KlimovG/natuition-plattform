import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SessionModel } from '../models/session.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_SESSIONS_FOR_ROBOT = `
  query ($serial: String!) {
    getSessionsForRobot(serial: $serial) {
      id
      startTime
      endTime
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class SessionsService {
  constructor(private apollo: Apollo) {}

  getSessionsForRobot(serial: string) {
    return this.apollo
      .query<{ getSessionsForRobot: SessionModel[] }>({
        query: gql(GET_SESSIONS_FOR_ROBOT),
        variables: {
          serial,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{ getSessionsForRobot: SessionModel[] }>
          ) => {
            return result.data.getSessionsForRobot;
          }
        )
      );
  }
}
