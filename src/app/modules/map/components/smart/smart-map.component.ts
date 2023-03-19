import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { GetMapForSession } from '../../state/map.actions';
import { MapDataFromServer } from '../../models/map-data-from-server.model';
import { selectMapData, selectMapLoading } from '../../state/map.reducer';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-smart-map',
  template: `
    <app-title-section
      class="flex w-full self-start mb-2"
      [title]="translationPrefix + 'title'"
    ></app-title-section>

    <app-map-container
      *ngIf="map$ | async"
      class="w-full flex rounded-xl overflow-hidden"
      [isLoading]="isLoading$ | async"
      [data]="map$ | async | mapData"
    ></app-map-container>
  `,
})
export class SmartMapComponent implements OnInit, OnDestroy {
  translationPrefix = 'map.';
  map$: Observable<MapDataFromServer>;
  isLoading$: Observable<boolean>;
  sessionsSubscription: Subscription;
  subscriptionsList: Subscription[] = [];

  constructor(
    private store: Store<State>,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectMapLoading());
    this.subscriptionsList.push(
      // this.store
      //   .select(selectActiveSession())
      //   .subscribe((session) => this.getMapData(Number(session))),
      this.store
        .select(selectMapLoading())
        .subscribe((value) =>
          value ? this.spinner.show('map') : this.spinner.hide('map')
        )
    );
    this.map$ = this.store.select(selectMapData());
  }

  ngOnDestroy() {
    this.subscriptionsList.forEach((s) => s.unsubscribe());
  }

  getMapData(session: number) {
    if (session) {
      this.store.dispatch(new GetMapForSession(session));
    }
  }
}
