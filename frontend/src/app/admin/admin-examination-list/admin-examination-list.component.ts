import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Examination } from 'src/app/models/Examination';
import { ExaminationStatus } from 'src/app/models/ExaminationStatus';
import { ExaminationResponseByFilter } from 'src/app/models/ExaminationResponseByFilter';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { AdminNewExaminationDialogComponent } from '../admin-new-examination-dialog/admin-new-examination-dialog.component';
import { AdminDeleteExaminationDialogComponent } from '../admin-delete-examination-dialog/admin-delete-examination-dialog.component';
import { AdminModifyExaminationDialogComponent } from '../admin-modify-examination-dialog/admin-modify-examination-dialog.component';

@Component({
  selector: 'app-admin-examination-list',
  templateUrl: './admin-examination-list.component.html',
  styleUrls: ['./admin-examination-list.component.scss']
})
export class AdminExaminationListComponent implements OnInit, OnChanges {

  examinations: Examination [] = [];
  examinationResponseByFilter : ExaminationResponseByFilter [] = [];
  public messages: Message[] = [];

  examinationTypes = ExaminationType;
  examinationStatus = ExaminationStatus;
  timeSlots = TimeSlot;

  searchExaminationForm = new FormGroup({
    referralNumber: new FormControl(null),
    medId: new FormControl(null),
    examinationType: new FormControl(null),
    examinationStatus: new FormControl(null),
    date: new FormControl(null),
    time: new FormControl(null),
  })


  constructor(private adminService: AdminService,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
             
    ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadExaminations(); 
   }

  ngOnInit(): void {
    this.loadExaminations();
  }

  deleteFilters(){
    this.searchExaminationForm = new FormGroup({
      referralNumber: new FormControl(null),
      medId: new FormControl(null),
      examinationType: new FormControl(null),
      examinationStatus: new FormControl(null),
      date: new FormControl(null),
      time: new FormControl(null),
    })
    this.loadExaminations();
  }

  transformResponseToExamination(response: any): Examination {
    return {
      referralNumber: response.referralNumber,
      type: response.type,
      status: response.status,
      id: response.id,
      date: response.date,
      time: response.time,
    };
  }

  convertToExamination(examinationResponseByFilter: ExaminationResponseByFilter): any {
    const examination: any = {};
  
    examination.referralNumber = examinationResponseByFilter.referralNumber;
    examination.type = examinationResponseByFilter.type;
    examination.status = examinationResponseByFilter.status;
    examination.date = examinationResponseByFilter.date;
    examination.time = examinationResponseByFilter.time;
    examination.id = examinationResponseByFilter.id;
  
    return examination;
  }

  loadExaminations(): void {
    const val = {
      referralNumber: this.searchExaminationForm.get('referralNumber')?.value,
      medId: this.searchExaminationForm.get('medId')?.value,
      type: this.searchExaminationForm.get('examinationType')?.value,
      status: this.searchExaminationForm.get('examinationStatus')?.value,
      date: this.searchExaminationForm.get('date')?.value,
      time: this.searchExaminationForm.get('time')?.value
    }
    this.adminService.getAllByFilter(val).subscribe(
      (res: any) => 
    {
      this.examinationResponseByFilter = res;
      this.examinations = res.map((response: any ) => this.transformResponseToExamination(response));
      
    },
    (error: any) => {
      this.messages = [{ severity: 'error', summary: 'Something went wrong.'}];
    }
    );
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(AdminNewExaminationDialogComponent, {
      width: '1200px',
      data: {
        examinations : this.examinations
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

  openDeleteDialog(examinationResponseByFilter: ExaminationResponseByFilter) {
    const dialogRef = this.dialog.open(AdminDeleteExaminationDialogComponent, {
      width: '500px',
      data: {
        examination : this.convertToExamination(examinationResponseByFilter),
        examinations : this.examinations
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

  openModifyDialog(examinationResponseByFilter: ExaminationResponseByFilter) {
    const dialogRef = this.dialog.open(AdminModifyExaminationDialogComponent, {
      width: '1000px',
      data: {
        examination : this.convertToExamination(examinationResponseByFilter),
        examinations : this.examinations,
        medId: examinationResponseByFilter.medId
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

}
