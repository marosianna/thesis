import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExaminationListComponent } from './examination-list/examination-list.component';

const routes: Routes = [
  { path: '', component: ExaminationListComponent},
  { path: 'examination-list', component: ExaminationListComponent},
  { path: '**', component: ExaminationListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationRoutingModule { }
