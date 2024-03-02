import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges{

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    window.location.reload();
  }

  loggedInUser: boolean = this.userService.isUserLoggedIn();

  logout(): void {
    this.userService.logout();
  }

}
