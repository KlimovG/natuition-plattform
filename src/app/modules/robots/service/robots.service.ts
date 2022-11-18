import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RobotModel } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

// const GET_ROBOTS_FOR_CUSTOMER = `
//   query ($id: Float!) {
//     getRobotsByCustomer(id: $id) {
//       id
//       robotSerialNumber
//     }
//   }
// `;
const GET_ROBOTS_FOR_CUSTOMER_DEV_ONLY = `
  query {
    getAllRobotsWithCustomers {
      serial
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
      .query<{ getAllRobotsWithCustomers: RobotModel[] }>({
        query: gql(GET_ROBOTS_FOR_CUSTOMER_DEV_ONLY),
        variables: {
          id: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getAllRobotsWithCustomers: RobotModel[];
            }>
          ) => {
            return result.data.getAllRobotsWithCustomers;
          }
        )
      );
  }
}
