import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminExaminationListComponent } from './admin-examination-list/admin-examination-list.component';
import { AuthGuard } from '../auth-config/auth-guard';

const routes: Routes = [
  { path: 'admin-examination-list', component: AdminExaminationListComponent },
  { path: '', component: AdminExaminationListComponent},
  { path: '**', component: AdminExaminationListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
