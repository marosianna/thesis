import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Examination } from 'src/app/models/Examination';
import { ExaminationService } from 'src/app/services/examination.service';
import { UserService } from 'src/app/services/user.service';
import { NewExaminationDialogComponent } from '../new-examination-dialog/new-examination-dialog.component';
import { DeleteExaminationDialogComponent } from '../delete-examination-dialog/delete-examination-dialog.component';
import { ModifyExaminationDialogComponent } from '../modify-examination-dialog/modify-examination-dialog.component';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-examination-list',
  templateUrl: './examination-list.component.html',
  styleUrls: ['./examination-list.component.scss'],
})
export class ExaminationListComponent implements OnInit, OnChanges{

  examinations: Examination [] = [];
  public messages: Message[] = [];


  constructor(private examinationService: ExaminationService,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
             
    ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadExaminations();  }

  ngOnInit(): void {
   this.loadExaminations();
  }

  loadExaminations(): void {
    this.examinationService.getAllByUser().subscribe(
      (res: any) => 
    {
      this.examinations = res
      
    },
    (error: any) => {
      this.messages = [{ severity: 'error', summary: 'Something went wrong.'}];
    }
    );
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(NewExaminationDialogComponent, {
      width: '1000px',
      data: {
        examinations : this.examinations
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

  openDeleteDialog(examination: Examination) {
    const dialogRef = this.dialog.open(DeleteExaminationDialogComponent, {
      width: '500px',
      data: {
        examination : examination,
        examinations : this.examinations
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

  openModifyDialog(examination: Examination) {
    const dialogRef = this.dialog.open(ModifyExaminationDialogComponent, {
      width: '1000px',
      data: {
        examination : examination,
        examinations : this.examinations
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.loadExaminations();
    });
  }

}
