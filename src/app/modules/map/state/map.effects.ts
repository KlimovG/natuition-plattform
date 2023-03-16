import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from '../service/map.service';
import {
  GetMapForSession,
  GetMapForSessionSuccess,
  MapActionTypes,
} from './map.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class MapEffects {
  constructor(private actions$: Actions, private service: MapService) {}

  getMapData$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetMapForSession>(MapActionTypes.GET_MAP_DATA),
      switchMap(({ payload }) =>
        this.service
          .getMapData(payload)
          .pipe(map((map) => new GetMapForSessionSuccess(map)))
      )
    )
  );
}
