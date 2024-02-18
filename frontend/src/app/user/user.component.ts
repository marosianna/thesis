import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../service/user.service';
import { AxiosService } from '../service/axios.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  componentToShow: string = 'welcome';
 
  constructor(private userService: UserService,
              private axiosService: AxiosService) { }


  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

  onLogin(input: any): void {
    this.axiosService.request(
      "POST",
      "/api/auth/login",
      {
        username: input.username,
        password: input.password
      }
    ).then(
      response => {
          this.axiosService.setAuthToken(response.data.token);
          this.componentToShow = "messages";
      }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.componentToShow = "welcome";
      }
  );
  }

  onLoginAdmin(input: any): void {
    this.axiosService.request(
      "POST",
      "/api/auth/login",
      {
        username: input.username,
        password: input.password
      }
    ).then(
      response => {
          this.axiosService.setAuthToken(response.data.token);
          this.componentToShow = "messages";
      }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.componentToShow = "welcome";
      }
  );
  }

  logout(): void {
    this.axiosService.request(
        "POST",
        "/api/auth/logout",
        {}
    ).then(
        () => {
            this.axiosService.setAuthToken(null);
            this.componentToShow = "welcome";
        }).catch(
        error => {
            console.error("Logout failed:", error);
        }
    );
}

  onRegister(input: any): void {
    this.axiosService.request(
      "POST",
      "/api/auth/register",
      {
        medId: input.medId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        username: input.username,
        password: input.password,
        role: input.role
      }
    ).then(
      response => {
          this.axiosService.setAuthToken(response.data.token);
          this.componentToShow = "messages";
      }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.componentToShow = "welcome";
      }
  );
  }

  onRegisterAdmin(input: any): void {
    this.axiosService.request(
      "POST",
      "/api/auth/register",
      {
        medId: input.medId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        username: input.username,
        password: input.password,
        role: input.role
      }
    ).then(
      response => {
          this.axiosService.setAuthToken(response.data.token);
          this.componentToShow = "messages";
      }).catch(
      error => {
          this.axiosService.setAuthToken(null);
          this.componentToShow = "welcome";
      }
  );
  }
}