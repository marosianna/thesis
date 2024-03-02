import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-config/auth-guard';

const routes: Routes = [
  { path: 'examination',  loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
