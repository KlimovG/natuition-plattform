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
import { selectCorners } from '../../state/map.reducer';

@Component({
  selector: 'app-smart-map',
  template: `
    <app-title-section
      [title]="translationPrefix + 'title'"
    ></app-title-section>
    <app-map-container [field]="field$ | async"></app-map-container>
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
      .subscribe((session) => this.getMapData(session));

    this.field$ = this.store.select(selectCorners());
  }

  getMapData(session: string) {
    const sessionId = Number(session);
    if (session && sessionId) {
      this.store.dispatch(new GetFieldForSession(sessionId));
      this.store.dispatch(new GetExtractedForSession(sessionId));
      this.store.dispatch(new GetPathForSession(sessionId));
    }
  }
}
