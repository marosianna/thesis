import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminExaminationListComponent } from './admin-examination-list/admin-examination-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AdminDeleteExaminationDialogComponent } from './admin-delete-examination-dialog/admin-delete-examination-dialog.component';
import { AdminNewExaminationDialogComponent } from './admin-new-examination-dialog/admin-new-examination-dialog.component';
import { AdminModifyExaminationDialogComponent } from './admin-modify-examination-dialog/admin-modify-examination-dialog.component';
import { SharedPipesModule } from '../pipes/shared-pipes/shared-pipes.module';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { HungarianPaginatorIntl } from '../utils/hungarianPaginatorIntl';


@NgModule({
  declarations: [
    AdminExaminationListComponent,
    AdminDeleteExaminationDialogComponent,
    AdminNewExaminationDialogComponent,
    AdminModifyExaminationDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    SharedPipesModule,
    MatPaginatorModule,
  
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: HungarianPaginatorIntl }
  ]
  ,
})
export class AdminModule { }
