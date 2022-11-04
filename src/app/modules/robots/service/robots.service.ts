import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RobotModel } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_ROBOTS_FOR_CUSTOMER = `
  query ($id: Float!) {
    getRobotsByCustomer(id: $id) {
      id
      robotSerialNumber
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  constructor(private apollo: Apollo) {}

  getRobotsForCustomer(id: number) {
    return this.apollo
      .query<{ getRobotsByCustomer: RobotModel[] }>({
        query: gql(GET_ROBOTS_FOR_CUSTOMER),
        variables: {
          id: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{ getRobotsByCustomer: RobotModel[] }>
          ) => {
            return result.data.getRobotsByCustomer;
          }
        )
      );
  }
}
