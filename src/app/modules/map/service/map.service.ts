import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { ExtractedWeedModel } from '../models/extracted-weed.model';
import { PathModel } from '../models/path.model';
import { FieldModel } from '../models/field.model';

const GET_FIELD = `
  query Query($id: Float!) {
    getField(id: $id) {
      id
      label
      corners
    }
  }
`;
const GET_EXTRACTED = `
  query GetExtractedPoints($sessionId: Float!) {
    getExtractedPoints(sessionId: $sessionId) {
      pointPath
      weedType
      number
    }
  }
`;
const GET_PATH = `
  query GetPath($sessionId: Float!) {
    getPath(sessionId: $sessionId)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private apollo: Apollo) {}

  getExtractedPoints(id: number): Observable<ExtractedWeedModel[]> {
    return this.apollo
      .query<{ getExtractedPoints: ExtractedWeedModel[] }>({
        query: gql(GET_EXTRACTED),
        variables: {
          sessionId: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getExtractedPoints: ExtractedWeedModel[];
            }>
          ) => {
            return result.data.getExtractedPoints;
          }
        )
      );
  }

  getPath(id: number): Observable<PathModel[]> {
    return this.apollo
      .query<{ getPath: PathModel[] }>({
        query: gql(GET_PATH),
        variables: {
          sessionId: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getPath: PathModel[];
            }>
          ) => {
            return result.data.getPath;
          }
        )
      );
  }

  getField(id: number): Observable<FieldModel> {
    return this.apollo
      .query<{ getField: FieldModel }>({
        query: gql(GET_FIELD),
        variables: {
          id: id,
        },
      })
      .pipe(
        map(
          (
            result: ApolloQueryResult<{
              getField: FieldModel;
            }>
          ) => {
            return result.data.getField;
          }
        )
      );
  }
}
