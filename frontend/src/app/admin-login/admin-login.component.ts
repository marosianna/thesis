import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../model/Role';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

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

}
