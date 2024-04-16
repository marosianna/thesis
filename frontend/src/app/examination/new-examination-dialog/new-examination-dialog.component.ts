import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'primeng/api';
import { catchError } from 'rxjs';
import { Examination } from 'src/app/models/Examination';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-new-examination-dialog',
  templateUrl: './new-examination-dialog.component.html',
  styleUrls: ['./new-examination-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewExaminationDialogComponent implements OnInit {

  examinationTypes = ExaminationType;
  timeSlots = TimeSlot;
  removeTimes: any;

  fromDate = new Date();
 
  public messages: Message[] = [];

  examinations : Examination [] = [];


  newExaminationForm = new FormGroup({
    referralNumber: new FormControl(""),
    examinationType: new FormControl(""),
    date: new FormControl(""),
    time: new FormControl(""),
  })

  newExamination: any = {}; 

  constructor(
    public examinationService: ExaminationService,
    public dialogRef: MatDialogRef<NewExaminationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
    this.examinations = this.data.examinations;
  }


  saveExamination(): void {
    const val = {
      referralNumber: this.newExaminationForm.get('referralNumber')?.value,
      examinationType: this.newExaminationForm.get('examinationType')?.value,
      date: this.newExaminationForm.get('date')?.value,
      time: this.newExaminationForm.get('time')?.value
    }

    this.examinationService.create(val).subscribe((res:any) => {
    this.examinations.push(res);
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
