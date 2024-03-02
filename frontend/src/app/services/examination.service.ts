import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { ExaminationType } from '../models/ExaminationType';
import { ExaminationStatus } from '../models/ExaminationStatus';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Examination } from '../models/Examination';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService extends BaseRequestService{

  constructor(http: HttpClient, private userService: UserService, private router: Router, private tokenServie: TokenService) {
    super(http);
  }
  url = 'api/examination';

  create(val: any) {
    const user = this.userService.getUser();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.access_token
    });
    return this.sendPost(this.url + '/create', val, headers);
  }

  getById(id: number) {
    return this.sendGet(this.url + '/' + id);
  }

  getAllByUser(): Observable<Examination[]> {
    const user = this.userService.getUser();
    console.log(user);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + user.access_token 
    });
    console.log(headers);
    return this.sendGet(this.url + '/by-user', headers);
  }

  getByFilter(examinationType: ExaminationType, examinationStatus: ExaminationStatus, fromDate: Date, toDate: Date) {
    const val = {
      examinationStatus,
      examinationType,
      fromDate,
      toDate
    };
    return this.sendPost(this.url + '/by-filter', val);
  }

  update(id: number, referralNumber: any, examinationType: ExaminationType, examinationStatus: ExaminationStatus, date: Date) {
    const val = {
      referralNumber,
      examinationType,
      examinationStatus,
      date
    };
    return this.sendPut(this.url + '/' + id, val);
  }
}
