import { Injectable } from '@angular/core';
import { map, Observable, Observer, startWith } from 'rxjs';
import { RobotModel, RobotStatus } from '../models/robot.model';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  private socket: Socket;

  constructor(private apollo: Apollo) {
    this.socket = io(environment.socket);
  }
  subscribeRobot(robotName: string) {
    this.socket.emit('subscribeRobot', robotName);
  }

  getRobotStatus(robotName: string): Observable<RobotStatus> {
    return new Observable((observer: Observer<RobotStatus>) => {
      this.socket.on(`robotStatus_${robotName}`, (status: RobotStatus) => {
        observer.next(status);
      });
    }).pipe(startWith(RobotStatus.OFF));
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
