import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminationRoutingModule } from './examination-routing.module';
import { ExaminationListComponent } from './examination-list/examination-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ExaminationComponent } from './examination.component';
import { NewExaminationDialogComponent } from './new-examination-dialog/new-examination-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DeleteExaminationDialogComponent } from './delete-examination-dialog/delete-examination-dialog.component';
import { ModifyExaminationDialogComponent } from './modify-examination-dialog/modify-examination-dialog.component';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { SharedPipesModule } from '../pipes/shared-pipes/shared-pipes.module';


@NgModule({
  declarations: [
    ExaminationListComponent,
    ExaminationComponent,
    NewExaminationDialogComponent,
    DeleteExaminationDialogComponent,
    ModifyExaminationDialogComponent,
  ],
  imports: [
    CommonModule,
    ExaminationRoutingModule,
    MatCardModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MessagesModule,
    ToastModule,
    SharedPipesModule
    ]
})
export class ExaminationModule { }
