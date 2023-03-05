import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SessionModel, SessionModelFromServer } from '../models/session.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_SESSIONS_FOR_ROBOT = `
  query ($serial: String!) {
    getSessionsForRobot(serial: $serial) {
      id
      startTime
      endTime
      extracted
      fieldName {
        label
      }
    }
  }
`;

const GET_MORE_SESSIONS_FOR_ROBOT = `
  query ($serial: String!, $sessionId: Float!) {
    getMoreSessionsForRobot(serial: $serial, sessionId: $sessionId) {
      id
      startTime
      endTime
      extracted
      fieldName {
        label
      }
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
      .query<{ getSessionsForRobot: SessionModelFromServer[] }>({
        query: gql(GET_SESSIONS_FOR_ROBOT),
        variables: {
          serial,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getSessionsForRobot: SessionModelFromServer[];
            }>
          ) => {
            return result.data.getSessionsForRobot.map((session) =>
              this.mapFromServer(session)
            );
          }
        )
      );
  }

  getMoreSessionsForRobot(serial: string, sessionId: number) {
    return this.apollo
      .query<{ getMoreSessionsForRobot: SessionModelFromServer[] }>({
        query: gql(GET_MORE_SESSIONS_FOR_ROBOT),
        variables: {
          serial,
          sessionId,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getMoreSessionsForRobot: SessionModelFromServer[];
            }>
          ) => {
            return result.data.getMoreSessionsForRobot.map((session) =>
              this.mapFromServer(session)
            );
          }
        )
      );
  }

  mapFromServer = (data: SessionModelFromServer): SessionModel => ({
    id: data.id,
    startTime: data.startTime,
    endTime: data.endTime,
    field: data.fieldName.label,
    prevSessionId: data?.prevSessionId,
    extracted: data?.extracted,
  });
}
