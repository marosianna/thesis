import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'primeng/api';
import { Examination } from 'src/app/models/Examination';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-modify-examination-dialog',
  templateUrl: './modify-examination-dialog.component.html',
  styleUrls: ['./modify-examination-dialog.component.scss']
})
export class ModifyExaminationDialogComponent implements OnInit {
  examinationTypes = ExaminationType;
  timeSlots = TimeSlot;
  examinations : Examination [] = [];

  public messages: Message[] = [];

  fromDate = new Date();

  newExaminationForm = new FormGroup({
    referralNumber: new FormControl(""),
    examinationType: new FormControl(""),
    date: new FormControl(""),
    time: new FormControl(""),
  })

  constructor(
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService,
    public dialogRef: MatDialogRef<ModifyExaminationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.examinations = this.data.examinations;

    this.newExaminationForm = this.formBuilder.group({
      referralNumber: [{value: this.data.examination.referralNumber, disabled: true}, Validators.required],
      examinationType: [this.data.examination.type, Validators.required],
      date: [this.data.examination.date, Validators.required],
      time: [this.data.examination.time, Validators.required] 
    });
  }

  saveExamination(): void {
    const val = {
      referralNumber: this.newExaminationForm.get('referralNumber')?.value,
      examinationType: this.newExaminationForm.get('examinationType')?.value,
      date: this.newExaminationForm.get('date')?.value,
      time: this.newExaminationForm.get('time')?.value
    }
    this.examinationService.update(this.data.examination.id, val).subscribe((res: any) => {
    const index = this.examinations.findIndex(examination => examination.id === this.data.examination.id);
    if (index !== -1) {
      this.examinations.splice(index, 1);
    }
    this.examinations.push(res);
    this.dialogRef.close();
    },
    (error: any) => {
      console.log(error.error.message);
      this.messages = [{ severity: 'error', summary: error.error.message}];
    }
    );
  }

  close() {
    this.dialogRef.close(); 
  }

  onNoClick(): void {
    this.dialogRef.close(); 
  }

}
