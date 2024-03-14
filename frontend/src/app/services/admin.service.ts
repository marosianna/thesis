import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Examination } from '../models/Examination';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseRequestService {

  constructor(http: HttpClient, private userService: UserService, private router: Router, private tokenServie: TokenService) {
    super(http);
    
  }

  url = 'api/admin/examination';

  create(val: any) {
    return this.sendPost(this.url + '/create', val);
  }

  getById(id: number) {
    return this.sendGet(this.url + '/' + id);
  }

  getAllByFilter(val: any): Observable<Examination[]> {
    return this.sendPost(this.url + '/by-filter', val);
  }
  /*

  getByFilter(examinationType: ExaminationType, examinationStatus: ExaminationStatus, fromDate: Date, toDate: Date) {
    const val = {
      examinationStatus,
      examinationType,
      fromDate,
      toDate
    };
    return this.sendPost(this.url + '/by-filter', val);
  }

  deleteById(id: number) {
    return this.sendDelete(this.url + '/' + id);
  }

  update(id: number, val: any) {
    return this.sendPut(this.url + '/' + id, val);
  }

  getAvailableTimes(date: Date) {
    return this.sendPost(this.url + '/available-times', date);
  }
  */
}