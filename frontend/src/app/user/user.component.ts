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
      "/login",
      {
        login: input.login,
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

  onRegister(input: any): void {
    this.axiosService.request(
      "POST",
      "/register",
      {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
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
}