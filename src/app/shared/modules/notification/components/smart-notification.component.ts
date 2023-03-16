import { Component, OnInit } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../../state';
import { CloseNotification } from '../state/notification.actions';
import { selectNotifications } from '../state/notification.reducer';

@Component({
  selector: 'app-notification',
  template: `
    <div
      class="lg:max-w-dashboard-web w-full fixed top-0 right-1/2 translate-x-2/4 z-50"
    >
      <div
        class="flex justify-between mt-4 p-6 rounded-xl bg-green-200 animate-notification transition-transform"
        *ngFor="let notification of notifications$ | async"
      >
        <p>{{ notification | translate }}</p>
        <fa-icon [icon]="icon" (click)="close()"></fa-icon>
      </div>
    </div>
  `,
})
export class SmartNotificationComponent implements OnInit {
  notifications$: Observable<string[]>;
  icon = faClose;
  constructor(private store: Store<State>) {}
  ngOnInit() {
    this.notifications$ = this.store.select(selectNotifications());
    this.notifications$.subscribe((notification) => {
      if (notification) {
        console.log(notification);
        // setTimeout(() => {
        //   this.close();
        // }, 3000);
      }
    });
  }
  close() {
    this.store.dispatch(new CloseNotification());
  }
}
