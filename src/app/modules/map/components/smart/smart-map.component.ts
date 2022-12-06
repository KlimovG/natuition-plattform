import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FieldModel } from '../../models/field.model';
import { PathModel } from '../../models/path.model';
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

@Component({
  selector: 'app-smart-map',
  template: `
    <app-title-section
      [title]="translationPrefix + 'title'"
    ></app-title-section>
    <app-map-container
      [field]="field$ | async"
      [path]="path$ | async"
      [extractedPoints]="extractedPoints$ | async"
    ></app-map-container>
  `,
})
export class SmartMapComponent implements OnInit {
  translationPrefix = 'map.';
  field$: Observable<FieldModel>;
  path$: Observable<PathModel[]>;
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
  }

  getMapData(session: number) {
    if (session) {
      this.store.dispatch(new GetFieldForSession(session));
      this.store.dispatch(new GetExtractedForSession(session));
      this.store.dispatch(new GetPathForSession(session));
    }
  }
}