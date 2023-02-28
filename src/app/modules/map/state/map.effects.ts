import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from '../service/map.service';
import {
  GetExtractedForSession,
  GetExtractedForSessionSuccess,
  GetFieldForSession,
  GetFieldForSessionSuccess,
  GetPathForSession,
  GetPathForSessionSuccess,
  MapActionTypes,
} from './map.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class MapEffects {
  constructor(private actions$: Actions, private service: MapService) {}

  getField$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetFieldForSession>(MapActionTypes.GET_FIELD),
      switchMap(({ payload }) =>
        this.service
          .getField(payload)
          .pipe(map((field) => new GetFieldForSessionSuccess(field)))
      )
    )
  );

  getPath$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetPathForSession>(MapActionTypes.GET_FIELD),
      switchMap(({ payload }) =>
        this.service
          .getPath(payload)
          .pipe(map((path) => new GetPathForSessionSuccess(path)))
      )
    )
  );

  getExtracted$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetExtractedForSession>(MapActionTypes.GET_FIELD),
      switchMap(({ payload }) =>
        this.service
          .getExtractedPoints(payload)
          .pipe(
            map((extracted) => new GetExtractedForSessionSuccess(extracted))
          )
      )
    )
  );
}
