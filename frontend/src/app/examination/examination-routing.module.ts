import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationListComponent } from './examination-list/examination-list.component';
import { AuthGuard } from '../auth-config/auth-guard';
import { NewExaminationDialogComponent } from './new-examination-dialog/new-examination-dialog.component';

const routes: Routes = [
  { path: 'examination-list', component: ExaminationListComponent, canActivate: [AuthGuard] },
  { path: '', component: ExaminationListComponent, canActivate: [AuthGuard]},
  { path: '**', component: ExaminationListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }
