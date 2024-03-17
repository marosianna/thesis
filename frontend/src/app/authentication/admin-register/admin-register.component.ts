import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService,
              private router: Router) { }

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
      sessionStorage.setItem('role', res.role)
      this.router.navigate(['/admin/examination']);
    },
    (error: any) => {
      console.log(error.error.message);
      this.messages = [{ severity: 'error', summary: error.error.message}];
    });
  }


}
