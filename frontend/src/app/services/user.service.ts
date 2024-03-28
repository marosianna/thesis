import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BaseRequestService } from './base-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseRequestService {
  readonly USER_KEY = 'auth-user';

  authUrl = 'api/auth';

  constructor(http: HttpClient, private tokenService: TokenService, private router: Router) {
    super(http);
  }

  //TODO : erre írni backend apit

  refreshToken(token: any) {
    return this.sendPost('api/refresh/', {refresh_token: token});
  }

  login(username: any, password: any) {
    const credentials = { username, password };
    return this.sendPost(this.authUrl + '/login', credentials);
  }

  loginAdmin(username: any, password: any) {
    const credentials = { username, password };
    return this.sendPost(this.authUrl +'/admin/login', credentials);
  }

  logout() {
    return this.sendPost(this.authUrl +'/logout', {}).subscribe(x => {
      this.tokenService.resetTokenStorage();
      this.router.navigate(['/login'])
    });
  }

  createUser(val: any): Observable<any> {
    return this.sendPost(this.authUrl + '/register', val);
  }

  createAdmin(val: any): Observable<any> {
    return this.sendPost(this.authUrl + '/admin/register', val);
  }

  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isUserLoggedIn() {
    return !!Object.keys(this.getUser()).length;
  }
}


