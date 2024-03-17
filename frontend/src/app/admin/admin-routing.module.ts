import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExaminationListComponent } from './admin-examination-list/admin-examination-list.component';
import { AuthGuard } from '../auth-config/auth-guard';

const routes: Routes = [
  { path: 'admin-examination-list', component: AdminExaminationListComponent, canActivate: [AuthGuard] },
  { path: '', component: AdminExaminationListComponent, canActivate: [AuthGuard]},
  { path: '**', component: AdminExaminationListComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
