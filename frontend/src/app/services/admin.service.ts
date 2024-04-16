import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { HttpClient } from '@angular/common/http';
import { Examination } from '../models/Examination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseRequestService {

  constructor(http: HttpClient) {
    super(http);
    
  }

  url = 'api/admin/examination';

  create(val: any) {
    return this.sendPost(this.url + '/create', val);
  }

  getAllByFilter(val: any): Observable<Examination[]> {
    return this.sendPost(this.url + '/by-filter', val);
  }

  isAdmin(): Observable<any>{
    return this.sendGet(this.url + '/is-admin');
  }

  isLoggedIn(): Observable<any>{
    return this.sendPost(this.url + '/is-logged-in');
  }
}