import { Injectable } from '@angular/core';
import { map, Observable, Observer } from 'rxjs';
import { RobotModel, RobotStatus } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  private socket: Socket;

  constructor(private apollo: Apollo) {
    this.socket = io('http://localhost:3000');
    this.socket.on('robotStatus', (status: RobotStatus) => {
      console.log('Received status:', status);
    });
  }
  registerRobot(robotName: string) {
    this.socket.emit('registerRobot', robotName);
  }

  getRobotStatus(robotName: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.socket.on(`robotStatus_${robotName}`, (status: RobotStatus) => {
        observer.next(status);
      });
    });
  }

  getRobotForUser(): Observable<RobotModel[]> {
    return this.apollo
      .query<{ getRobotForUser: RobotModel[] }>({
        query: gql`
          query {
            getRobotForUser {
              id
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
}
