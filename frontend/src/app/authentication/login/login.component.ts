import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../../models/Role';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  public messages: Message[] = [];

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
    //sessionStorage.clear();
  }

  onSubmitUserLogin(): void {
    if(this.username === '' || this.password === ''){
      this.messages = [{ severity: 'error', summary: 'Fill in all the fields!'}];
      return;
    }
    this.userService.login(this.username, this.password).subscribe(
      (response: any) => {
          this.tokenService.saveAccessToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
          this.tokenService.saveUser(response);
          sessionStorage.setItem('role', response.role)
          this.router.navigate(['/user/examination']);
      },
      (error: any) => {
        console.log(error.error.message);
        this.messages = [{ severity: 'error', summary: error.error.message}];
      }
      );
  }
}
