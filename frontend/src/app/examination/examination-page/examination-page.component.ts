import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Message } from 'primeng/api';
import { Examination } from 'src/app/models/Examination';
import { ExaminationType } from 'src/app/models/ExaminationType';
import { TimeSlot } from 'src/app/models/TimeSlot';
import { DocumentService } from 'src/app/services/document.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-examination-page',
  templateUrl: './examination-page.component.html',
  styleUrls: ['./examination-page.component.scss']
})
export class ExaminationPageComponent implements OnInit{
  examinationTypes = ExaminationType;
  timeSlots = TimeSlot;

  public messages: Message[] = [];

  fromDate = new Date();

  file: File | undefined = undefined;
  uploadedFileName?: string | null;

  examination?: Examination;
  loggedInUserIsAdmin: boolean = false;
  resultByExamination: number = 0;
  adminId: any = null;
  isFileUploaded: boolean = false;

  constructor(
    private documentService: DocumentService,
    private examinationService: ExaminationService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<ExaminationPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.examination = this.data.examination;
    this.loggedInUserIsAdmin = this.tokenService.getrole() == 'ADMIN';
    this.getResult();
    this.getAdmin();
    this.isFileUploaded = false;
  }

    onChange(event: any) { 
      this.file = event.target.files[0]; 
      this.uploadedFileName = event.target.files[0].name;
      if (this.file) {
        this.isFileUploaded = true;
      } else {
        this.isFileUploaded = false;
      }
  } 

    close() {
      this.dialogRef.close(); 
    }

  onNoClick(): void {
    this.dialogRef.close(); 
  }

  openDocument(){}

  deleteUploadedFile(){
    this.file = undefined;
    this.uploadedFileName = null;
    this.isFileUploaded = false;
  }

  onUpload() {
    const val = {
      examinationId: this.examination?.id,
    }

    const formData:any = new FormData();
    if (!this.file) {
      this.messages = [{ severity: 'error', summary: 'Please select a file.'}];
      return;
    }
    formData.append('file', this.file, this.file?.name);
    formData.append('examinationId', JSON.stringify(val.examinationId));

    console.log(formData);
    this.documentService.upload(formData).subscribe( 
        (res: any) => { 
          this.dialogRef.close();
        },
        (error: any) => {
          this.messages = [{ severity: 'error', summary: error.error.message}];
        }
    ); 
} 


onDownload() {
  this.documentService.download(this.examination?.id).subscribe( 
      (res: any) => { 
        const blob = new Blob([res], { type: 'application/json' });

        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.examination?.referralNumber + "_" + this.examination?.type + ".pdf";
        link.click();
        this.dialogRef.close();
      },
      (error: any) => {
        this.messages = [{ severity: 'error', summary: error.error.message}];
      }
  );
}

  getAdmin(): any {
    this.examinationService.getAdmin().subscribe((res) => {
      this.adminId = res;
    },
    (error: any) => {
      this.messages = [{ severity: 'error', summary: 'Something went wrong.'}];
    }
    );
  }

  getResult()  {
    this.documentService.getResultByExaminationId(this.examination?.id).subscribe(
      (res: any) => {
        this.resultByExamination = res;
      },
      (error: any) => {
        this.messages = [{ severity: 'error', summary: 'Something went wrong.'}];
      }
    );
  }

}
