import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RobotModel } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  constructor(private apollo: Apollo) {}

  getRobotForUser(): Observable<RobotModel[]> {
    return this.apollo
      .query<{ getRobotForUser: RobotModel[] }>({
        query: gql`
          query {
            getRobotForUser {
              serial
              status
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
}
