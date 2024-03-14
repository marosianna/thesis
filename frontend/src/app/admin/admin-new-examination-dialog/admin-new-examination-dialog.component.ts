import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'primeng/api';
import { Examination } from 'src/app/models/Examination';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { AdminService } from 'src/app/services/admin.service';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-admin-new-examination-dialog',
  templateUrl: './admin-new-examination-dialog.component.html',
  styleUrls: ['./admin-new-examination-dialog.component.scss']
})
export class AdminNewExaminationDialogComponent implements OnInit {
  
  examinationTypes = ExaminationType;
  timeSlots = TimeSlot;
  removeTimes: any;

  fromDate = new Date();
 
  public messages: Message[] = [];

  examinations : Examination [] = [];


  newExaminationForm = new FormGroup({
    referralNumber: new FormControl(""),
    medId: new FormControl(""),
    examinationType: new FormControl(""),
    date: new FormControl(""),
    time: new FormControl(""),
  })

  newExamination: any = {}; 

  constructor(
    public examinationService: ExaminationService,
    private adminService: AdminService,
    public dialogRef: MatDialogRef<AdminNewExaminationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.examinations = this.data.examinations;
    console.log(this.examinations);
  }


  saveExamination(): void {
    const val = {
      referralNumber: this.newExaminationForm.get('referralNumber')?.value,
      medId: this.newExaminationForm.get('medId')?.value,
      examinationType: this.newExaminationForm.get('examinationType')?.value,
      date: this.newExaminationForm.get('date')?.value,
      time: this.newExaminationForm.get('time')?.value
    }

    this.adminService.create(val).subscribe((res:any) => {
    this.examinations.push(res);
    console.log(this.examinations);
    this.dialogRef.close(this.newExamination);
    },
    (error: any) => {
      console.log(error.error.message);
      this.messages = [{ severity: 'error', summary: error.error.message}];
    }
    )
  }

  close() {
    this.dialogRef.close(); 
  }

  onNoClick(): void {
    this.dialogRef.close(); 
  }

  onDateSelected(event: any) {
    const selectedDate: Date = event.value;
    this.examinationService.getAvailableTimes(selectedDate).subscribe((res: any) => {
      this.removeTimes = res;
    })
  }

  isAvailable(value: any): boolean {
    return this.removeTimes && !this.removeTimes.includes(value);
  }

}
