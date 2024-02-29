import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private userService: UserService) {}

  loggedInUser: boolean = this.userService.isUserLoggedIn();

  logout(): void {
    this.userService.logout();
  }

}
