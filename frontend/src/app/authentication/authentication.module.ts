import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { MessagesModule } from 'primeng/messages';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class AuthenticationModule { }
