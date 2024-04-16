import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { passwordMatchValidator } from 'src/app/utils/password-match-validator';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {

  signUpForm = new FormGroup({
    medId: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl("", [Validators.required, Validators.minLength(8)])
  },  { validators: passwordMatchValidator })

  public messages: Message[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private tokenService: TokenService) { }

  onSubmitAdminRegister(){
    this.signUpForm.updateValueAndValidity(); 
    if (this.signUpForm.invalid) {
      console.log(this.signUpForm.errors);
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

    this.userService.createAdmin(val).subscribe(response => {
      this.messages = [{ severity: 'success', summary: "Sikeres regisztráció!"}];
      this.tokenService.saveAccessToken(response.access_token);
      this.tokenService.saveRefreshToken(response.refresh_token);
      this.tokenService.saveUser(response);
      sessionStorage.setItem('role', response.role)
      this.router.navigate(['/admin/examination']);
    },
    (error: any) => {
      console.log(error.error.message);
      this.messages = [{ severity: 'error', summary: error.error.message}];
    });
  }


}
