import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

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

  onSubmitUserRegister(){

    const val = {
      medId: this.signUpForm.get('medId')?.value,
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value
    };

    this.userService.createUser(val).subscribe(res => {
      this.messages = [{ severity: 'success', summary: "Registration is successful!"}];
    },
    (error: any) => {
      console.log(error.error.message);
      this.messages = [{ severity: 'error', summary: error.error.message}];
    });
  }


}
