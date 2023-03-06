import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RobotModel } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';

const GET_ROBOTS_FOR_CUSTOMER = `
  query {
    getAllRobotsWithCustomers{
      serial
    }
  }
`;
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

  getRobotsForCustomer(id: number) {
    return this.apollo
      .query<{ getAllRobotsWithCustomers: RobotModel[] }>({
        query: gql(GET_ROBOTS_FOR_CUSTOMER),
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
