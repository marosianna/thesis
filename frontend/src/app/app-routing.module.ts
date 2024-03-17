import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-config/auth-guard';
import { AdminGuard } from './auth-config/admin-guard';

const routes: Routes = [
  { path: 'admin/examination', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),  canActivate: [ AuthGuard] },
  { path: 'user/examination',  loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: '',  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
