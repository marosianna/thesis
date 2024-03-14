import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  readonly TOKEN_KEY = 'auth-access-token';
  readonly REFRESHTOKEN_KEY = 'auth-refreshtoken';
  readonly USER_KEY = 'auth-user';

  constructor() { }

  resetTokenStorage() {
    localStorage.clear()
  }

  saveAccessToken(token: any) {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  saveRefreshToken(token: string): void {
    localStorage.removeItem(this.REFRESHTOKEN_KEY);
    localStorage.setItem(this.REFRESHTOKEN_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESHTOKEN_KEY);
  }

  saveUser(user: any): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

}

