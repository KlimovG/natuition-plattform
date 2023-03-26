import { Component, Input } from '@angular/core';
import {
  faCircle,
  faHomeUser,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { State } from '../../../state';
import { LogOut } from '../../../modules/auth/state/auth.actions';

@Component({
  selector: 'app-header',
  template: `
    <div class="flex items-center justify-between relative">
      <button
        class="
        Montserrat-Medium
        w-9
        h-9
        border-2
        border-orange-400
        transition
        rounded-full
        hover:text-white
        hover:bg-orange-400
        flex
        items-center
        justify-center
        "
        role="button"
        [ngClass]="{
          'bg-orange-400 text-gray-white': showHome,
          'bg-white text-orange-400': !showHome
        }"
        (click)="toggleHome()"
      >
        <fa-icon [fixedWidth]="true" size="1x" [icon]="iconHome"></fa-icon>
      </button>

      <div
        class="flex-col items-stretch p-6 absolute top-14 right-1 z-10 bg-gray-white shadow-2xl shadow-green-dark rounded-lg border-primary-main border-2"
        *ngIf="showHome"
      >
        <app-user-label></app-user-label>
        <app-button-secondary
          class="flex mt-3 "
          text="header.signOut"
          [fullWidth]="true"
          (click)="signOut()"
        >
          <fa-icon class="ml-1" [icon]="iconOut" [fixedWidth]="true"></fa-icon>
        </app-button-secondary>
      </div>
    </div>
  `,
  styles: [],
})
export class HeaderComponent {
  @Input() userName: string = 'George Klimov';
  iconHome = faHomeUser;
  mask = faCircle;
  iconOut = faSignOut;
  showHome = false;
  constructor(private store: Store<State>) {}

  signOut() {
    this.store.dispatch(new LogOut());
  }
  toggleHome() {
    this.showHome = !this.showHome;
  }
}
