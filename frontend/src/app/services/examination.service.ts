import { Injectable } from '@angular/core';
import { BaseRequestService } from './base-request.service';
import { HttpClient } from '@angular/common/http';
import { ExaminationType } from '../models/ExaminationType';
import { ExaminationStatus } from '../models/ExaminationStatus';
import { Observable } from 'rxjs';
import { Examination } from '../models/Examination';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService extends BaseRequestService{

  constructor(http: HttpClient) {
    super(http);
    
  }

  url = 'api/examination';

  create(val: any) {
    return this.sendPost(this.url + '/create', val);
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

  getAdmin(): Observable<any> {
    return this.sendPost(this.url + '/get-admin');
  }
}
