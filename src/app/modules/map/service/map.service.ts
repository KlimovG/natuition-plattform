import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { MapDataFromServer } from '../models/map-data-from-server.model';

const GET_MAP_DATA = `
  query GetMapData($sessionId: Float!) {
    getMapData(sessionId: $sessionId){
      extracted {
        pointPath
        weedType
        number
      }

      path {
       path
      }

      field {
        id
        label
        corners
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private apollo: Apollo) {}

  getMapData(id: number): Observable<MapDataFromServer> {
    return this.apollo
      .query<{ getMapData: MapDataFromServer }>({
        query: gql(GET_MAP_DATA),
        variables: {
          sessionId: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getMapData: MapDataFromServer;
            }>
          ) => {
            return result.data.getMapData;
          }
        )
      );
  }
}
