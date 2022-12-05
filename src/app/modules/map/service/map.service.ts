import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import {
  ExtractedWeedModel,
  ExtractedWeedModelFromServer,
} from '../models/extracted-weed.model';
import { PathModel, PathModelFromServer } from '../models/path.model';
import { FieldModel, FieldModelFromServer } from '../models/field.model';
import { LngLat } from 'mapbox-gl';
import { GpsPointModel } from '../models/gps-point.model';

const GET_FIELD = `
  query Query($id: Float!) {
    getField(id: $id) {
      id
      label
      corners {
        gpsPoint {
          latitude
          longitude
        }
      }
    }
  }
`;
const GET_EXTRACTED = `
  query GetExtractedPoints($sessionId: Float!) {
    getExtractedPoints(sessionId: $sessionId) {
      id
      pointPath {
        gpsPoint {
          latitude
          longitude
        }
      }
      weedType {
        label
      }
    }
  }
`;
const GET_PATH = `
  query GetPath($sessionId: Float!) {
    getPath(sessionId: $sessionId) {
      id
      pointNumber
      gpsPoint {
        longitude
        latitude
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private apollo: Apollo) {}

  getExtractedPoints(id: number): Observable<ExtractedWeedModel[]> {
    return this.apollo
      .query<{ getExtractedPoints: ExtractedWeedModelFromServer[] }>({
        query: gql(GET_EXTRACTED),
        variables: {
          sessionId: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getExtractedPoints: ExtractedWeedModelFromServer[];
            }>
          ) => {
            return result.data.getExtractedPoints.map((data) => ({
              id: data.id,
              label: data.weedType.label,
              number: data.number,
              lng: data.pointPath.gpsPoint.latitude,
              lat: data.pointPath.gpsPoint.longitude,
            }));
          }
        )
      );
  }

  getPath(id: number): Observable<PathModel[]> {
    return this.apollo
      .query<{ getPath: PathModelFromServer[] }>({
        query: gql(GET_PATH),
        variables: {
          sessionId: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getPath: PathModelFromServer[];
            }>
          ) => {
            return result.data.getPath.map((data) => ({
              id: data.id,
              lng: data.gpsPoint.longitude,
              lat: data.gpsPoint.latitude,
            }));
          }
        )
      );
  }

  getField(id: number): Observable<FieldModel> {
    return this.apollo
      .query<{ getField: FieldModelFromServer }>({
        query: gql(GET_FIELD),
        variables: {
          id: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getField: FieldModelFromServer;
            }>
          ) => {
            const corners: LngLat[] = (
              result.data.getField.corners as unknown as Array<{
                gpsPoint: GpsPointModel;
              }>
            )
              .map(({ gpsPoint }) => gpsPoint)
              .map((point) => new LngLat(point.longitude, point.latitude));

            return {
              ...result.data.getField,
              corners,
            };
          }
        )
      );
  }
}
