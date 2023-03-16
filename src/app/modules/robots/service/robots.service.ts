import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RobotModel } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_ROBOT_STATUS = `
  query($name: String!) {
    getRobotStatus(name: $name)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  constructor(private apollo: Apollo) {}

  getRobotForUser(id: number) {
    return this.apollo
      .query<{ getRobotForUser: RobotModel[] }>({
        query: gql`
          query {
            getRobotForUser {
              serial
            }
          }
        `,
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getRobotForUser: RobotModel[];
            }>
          ) => {
            return result.data.getRobotForUser;
          }
        )
      );
  }

  getRobotStatus(name: string): Observable<any> {
    return this.apollo
      .query<{ getRobotStatus: string }>({
        query: gql(GET_ROBOT_STATUS),
        variables: {
          name: name,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getRobotStatus: string;
            }>
          ) => {
            return result.data.getRobotStatus;
          }
        )
      );
  }
}
