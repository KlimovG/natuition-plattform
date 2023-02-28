import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { FieldModel } from '../../models/field.model';
import { ExtractedWeedModel } from '../../models/extracted-weed.model';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { selectActiveSession } from '../../../sessions/state/sessions.reducer';
import {
  GetExtractedForSession,
  GetFieldForSession,
  GetPathForSession,
} from '../../state/map.actions';
import {
  selectCorners,
  selectExtracted,
  selectPath,
} from '../../state/map.reducer';
import { MapDataFromServer } from '../../models/map.model';

@Component({
  selector: 'app-smart-map',
  template: `
    <app-title-section
      class="flex w-full self-start"
      [title]="translationPrefix + 'title'"
    ></app-title-section>
    <app-map-container [data]="map$ | async | mapData"></app-map-container>
  `,
})
export class SmartMapComponent implements OnInit {
  translationPrefix = 'map.';
  map$: Observable<MapDataFromServer>;
  field$: Observable<FieldModel>;
  path$: Observable<[number, number][]>;
  extractedPoints$: Observable<ExtractedWeedModel[]>;
  sessionsSubscription: Subscription;
  subscriptionsList: Subscription[] = [];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.sessionsSubscription = this.store
      .select(selectActiveSession())
      .subscribe((session) => this.getMapData(Number(session)));

    this.field$ = this.store.select(selectCorners());
    this.path$ = this.store.select(selectPath());
    this.extractedPoints$ = this.store.select(selectExtracted());
    this.map$ = combineLatest([
      this.store.select(selectCorners()),
      this.store.select(selectPath()),
      this.store.select(selectExtracted()),
    ]).pipe(
      map(([field, path, extractedPoints]) => ({
        field,
        path,
        extractedPoints,
      }))
    );
  }

  getMapData(session: number) {
    if (session) {
      this.store.dispatch(new GetFieldForSession(session));
      this.store.dispatch(new GetExtractedForSession(session));
      this.store.dispatch(new GetPathForSession(session));
    }
  }
}
