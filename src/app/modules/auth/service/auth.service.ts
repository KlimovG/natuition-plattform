import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GC_AUTH_TOKEN, GC_USER_ID } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userId: string | null = null;
  private _isAuthenticated = new BehaviorSubject(false);
  constructor() {}

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  set userId(id: string | null) {
    this._userId = id;
    this._isAuthenticated.next(true);
  }

  save(id: string, token: string) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.userId = id;
  }

  logOut() {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.userId = null;
    this._isAuthenticated.next(false);
  }

  autoLogin() {
    const id = localStorage.getItem(GC_USER_ID);
    if (id) {
      this.userId = id;
    }
  }
}
