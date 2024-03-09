import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { Examination } from 'src/app/models/Examination';
import { ExaminationService } from 'src/app/services/examination.service';

@Component({
  selector: 'app-delete-examination-dialog',
  templateUrl: './delete-examination-dialog.component.html',
  styleUrls: ['./delete-examination-dialog.component.scss']
})
export class DeleteExaminationDialogComponent implements OnInit{

  public messages: Message[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private examinationService: ExaminationService,
              public dialogRef: MatDialogRef<DeleteExaminationDialogComponent>,
              @Inject( MAT_DIALOG_DATA ) public data: any) {}


  ngOnInit(): void {
    this.examinations = this.data.examinations;
  }

  examinations : Examination [] = [];

  deleteById(): void {
    this.examinationService.deleteById(this.data.examination.id).subscribe((res) => {
    const index = this.examinations.findIndex(examination => examination.id === this.data.examination.id);
    if (index !== -1) {
      this.examinations.splice(index, 1);
    }
    this.dialogRef.close();
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

}
