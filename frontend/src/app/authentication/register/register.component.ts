import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/utils/password-match-validator';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpForm = new FormGroup({
    medId: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl("", [Validators.required, Validators.minLength(8)])
  },  { validators: passwordMatchValidator })

  public messages: Message[] = [];

  constructor(private userService: UserService,
              private router : Router,
              private tokenService: TokenService) { }

  onSubmitUserRegister(){

    this.signUpForm.updateValueAndValidity(); 
    if (this.signUpForm.invalid) {
      this.messages = [{ severity: 'error', summary: 'Hiba az adatok megadásával!'}];
      return;
    }

    const val = {
      medId: this.signUpForm.get('medId')?.value,
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      username: this.signUpForm.get('username')?.value,
      password: this.signUpForm.get('password')?.value,
      rePassword: this.signUpForm.get('rePassword')?.value,
    };

    this.userService.createUser(val).subscribe(response => {
      this.messages = [{ severity: 'success', summary: "Sikeres regisztráció!"}];
      sessionStorage.setItem('role', response.role)
      this.tokenService.saveAccessToken(response.access_token);
      this.tokenService.saveRefreshToken(response.refresh_token);
      this.tokenService.saveUser(response);
      this.router.navigate(['/user/examination']);
    },
    (error: any) => {
      console.log(error.error.message);
      this.messages = [{ severity: 'error', summary: error.error.message}];
    });
  }


}
