import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {

  signUpForm = new FormGroup({
    medId: new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl("")
  })

  public messages: Message[] = [];

  constructor(private userService: UserService) { }

  onSubmitAdminRegister(){

    const val = {
      medId: this.signUpForm.get('medId')?.value,
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value
    };

    this.userService.createAdmin(val).subscribe(res => {
      this.messages = [{ severity: 'success', summary: "Registration is successful!"}];
    },
      error => {
        this.messages = [{ severity: 'error', detail: error.error.username}];
      });
  }


}