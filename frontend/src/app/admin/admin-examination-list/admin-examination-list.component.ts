import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'primeng/api';
import { Examination } from 'src/app/models/Examination';
import { ExaminationStatus } from 'src/app/models/ExaminationStatus';
import { ExaminationResponseByFilter } from 'src/app/models/ExaminationResponseByFilter';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { AdminService } from 'src/app/services/admin.service';
import { AdminNewExaminationDialogComponent } from '../admin-new-examination-dialog/admin-new-examination-dialog.component';
import { AdminModifyExaminationDialogComponent } from '../admin-modify-examination-dialog/admin-modify-examination-dialog.component';
import { ExaminationPageComponent } from 'src/app/examination/examination-page/examination-page.component';
import { DeleteExaminationDialogComponent } from 'src/app/examination/delete-examination-dialog/delete-examination-dialog.component';
import { PageEvent } from '@angular/material/paginator';

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

  public pageSlice = this.examinationResponseByFilter.slice(0, 5);

  searchExaminationForm = new FormGroup({
    referralNumber: new FormControl(null),
    medId: new FormControl(null),
    examinationType: new FormControl(null),
    examinationStatus: new FormControl(null),
    date: new FormControl(null),
    time: new FormControl(null),
  })

  constructor(private adminService: AdminService,
              private dialog: MatDialog,
    ){}

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.examinationResponseByFilter.length) {
      endIndex = this.examinationResponseByFilter.length;
    }
    this.pageSlice = this.examinationResponseByFilter.slice(startIndex, endIndex);
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.loadExaminations(); 
   }

  ngOnInit(): void {
    this.loadExaminations();
  }

  isModifiable(examinationResponse: ExaminationResponseByFilter): boolean {
    const examination = this.convertToExamination(examinationResponse);
    return examination.status !== this.getKeyByValue(ExaminationStatus, ExaminationStatus.CLOSED) && examination.status !== this.getKeyByValue(ExaminationStatus, ExaminationStatus.WAITING_FOR_RESULT);
  }
  getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
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
    const filter = {
      referralNumber: this.searchExaminationForm.get('referralNumber')?.value,
      medId: this.searchExaminationForm.get('medId')?.value,
      type: this.searchExaminationForm.get('examinationType')?.value,
      status: this.searchExaminationForm.get('examinationStatus')?.value,
      date: this.searchExaminationForm.get('date')?.value,
      time: this.searchExaminationForm.get('time')?.value,
    }
    setTimeout(() => {
      this.adminService.getAllByFilter(filter).subscribe(
        (res: any) => {
          this.examinationResponseByFilter = res;
          this.pageSlice = this.examinationResponseByFilter.slice(0, 5);
          this.examinations = res.map((response: any) => this.transformResponseToExamination(response));
        }
      );
    }, 500);
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
    const dialogRef = this.dialog.open(DeleteExaminationDialogComponent, {
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

  openPage(examinationResponseByFilter: ExaminationResponseByFilter){
    const dialogRef = this.dialog.open(ExaminationPageComponent, {
      width: '1000px',
      data: {
        examination : this.convertToExamination(examinationResponseByFilter),
        medId: examinationResponseByFilter.medId
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

}
