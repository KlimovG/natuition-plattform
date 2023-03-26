import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public signOut(): void {
    localStorage.clear();
  }

  set accessToken(token: string | null) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token as string);
  }

  get accessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // set refreshToken(token: string | null) {
  //   localStorage.removeItem(REFRESH_TOKEN_KEY);
  //   localStorage.setItem(REFRESH_TOKEN_KEY, token as string);
  // }

  // get refreshToken(): string | null {
  //   return localStorage.getItem(REFRESH_TOKEN_KEY);
  // }

  set user(user: any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  get user(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  removeTokens() {
    // this.refreshToken = undefined;
    this.accessToken = undefined;
    this.signOut();
  }
}
