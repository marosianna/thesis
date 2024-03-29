import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../model/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() onSubmitUserLoginEvent = new EventEmitter();
  @Output() onSubmitUserRegisterEvent = new EventEmitter();

  active: string = "login";
  medId: number | undefined;
  firstName: string = "";
  lastName: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  role: number = Role.User;

  onSubmitUserLogin(): void {
    this.onSubmitUserLoginEvent.emit({"username": this.username, "password": this.password});
  }

  onLoginTab(): void {
    this.active = "login";
  }

  onRegisterTab(): void {
    this.active = "register";
  }

  onSubmitUserRegister(): void {
    this.onSubmitUserRegisterEvent.emit({
      "medId" : this.medId,
      "firstName": this.firstName,
      "lastName": this.lastName,
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "role": this.role
    })
  }
}
