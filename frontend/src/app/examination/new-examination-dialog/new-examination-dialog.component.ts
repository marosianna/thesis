import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExaminationStatus } from 'src/app/models/ExaminationStatus';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-new-examination-dialog',
  templateUrl: './new-examination-dialog.component.html',
  styleUrls: ['./new-examination-dialog.component.scss']
})
export class NewExaminationDialogComponent {

  examinationTypes = Object.keys(ExaminationType);
  examinationStatuses = Object.keys(ExaminationStatus);

  newExaminationForm = new FormGroup({
    referralNumber: new FormControl(""),
    examinationType: new FormControl(""),
    date: new FormControl(""),
  })

  newExamination: any = {}; 

  constructor(
    private examinationService: ExaminationService,
    public dialogRef: MatDialogRef<NewExaminationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveExamination(): void {
    const val = {
      referralNumber: this.newExaminationForm.get('referralNumber')?.value,
      examinationType: this.newExaminationForm.get('examinationType')?.value,
      date: this.newExaminationForm.get('date')?.value,
    }
    this.examinationService.create(val).subscribe((res) => {
      this.dialogRef.close(this.newExamination);
    },
    (error: any) => {
      console.log("Saving wasn't successful!");
    });
    
    
  }

  onNoClick(): void {
    this.dialogRef.close(); 
  }

}
