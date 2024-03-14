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
    return this.sendPost(this.url + '/create', val);
  }

  getById(id: number) {
    return this.sendGet(this.url + '/' + id);
  }

  getAllByUser(): Observable<Examination[]> {
    return this.sendGet(this.url + '/by-user');
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

  deleteById(id: number) {
    return this.sendDelete(this.url + '/' + id);
  }

  update(id: number, val: any) {
    return this.sendPut(this.url + '/' + id, val);
  }

  getAvailableTimes(date: Date) {
    return this.sendPost(this.url + '/available-times', date);
  }
}
