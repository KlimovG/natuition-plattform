import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserName } from '../../../../modules/auth/state/auth.reducer';
import { State } from '../../../../state';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
})
export class UserLabelComponent implements OnInit {
  userName$: Observable<string>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.userName$ = this.store.select(getUserName);
  }
}
