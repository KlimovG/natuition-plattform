import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  public signOut(): void {
    localStorage.clear();
  }

  set token(token: string | null) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token as string);

    const user = this.user;
    if (user.id) {
      this.user = { ...user, accessToken: token };
    }
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  set refreshToken(token: string | null) {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token as string);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

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
}
