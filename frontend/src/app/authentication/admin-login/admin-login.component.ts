import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../../models/Role';
import { Message, MessageService } from 'primeng/api';
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

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router,
    private messageService: MessageService) {
    //sessionStorage.clear();
  }

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
          sessionStorage.setItem('role', response.role)
          this.router.navigate(['/admin/examination']);
      },
      (error: any) => {
        console.log(error.error.message);
        this.messages = [{ severity: 'error', summary: error.error.message}];
      }
      );
  }

}
