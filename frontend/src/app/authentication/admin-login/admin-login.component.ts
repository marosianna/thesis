import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../../models/Role';
import { Message } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  username: string = '';
  password: string = '';

  public messages: Message[] = [];

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {}

  onSubmitAdminLogin(): void {
    if(this.username === '' || this.password === ''){
      this.messages = [{ severity: 'error', summary: 'Fill in all the fields!'}];
      return;
    }
    this.userService.loginAdmin(this.username, this.password).subscribe(
      (response: any) => {
          this.tokenService.saveAccessToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
          this.tokenService.saveUser(response);
          this.router.navigate(['/examination']);
      },
      (error: any) => {
        console.log(error.error.message);
        this.messages = [{ severity: 'error', summary: error.error.message}];
      }
      );
  }

  
/*
  @Output() onSubmitAdminLoginEvent = new EventEmitter();
  @Output() onSubmitAdminRegisterEvent = new EventEmitter();

  active: string = "login";
  medId: number | undefined;
  firstName: string = "";
  lastName: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  role: number = Role.Admin;


  onSubmitAdminLogin(): void {
    this.onSubmitAdminLoginEvent.emit({"username": this.username, "password": this.password});
  }

  onLoginTab(): void {
    this.active = "login";
  }

  onRegisterTab(): void {
    this.active = "register";
  }

  onSubmitAdminRegister(): void {
    this.onSubmitAdminRegisterEvent.emit({
      "medId": this.medId,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "role": this.role
    })
  }
  */

}
