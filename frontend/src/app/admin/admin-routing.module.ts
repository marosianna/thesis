import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExaminationListComponent } from './admin-examination-list/admin-examination-list.component';
import { AdminGuard } from '../auth-config/admin-guard';

const routes: Routes = [
  { path: 'admin-examination-list', component: AdminExaminationListComponent, canActivate: [AdminGuard] },
  { path: '', component: AdminExaminationListComponent, canActivate: [AdminGuard]},
  { path: '**', component: AdminExaminationListComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
