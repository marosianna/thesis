import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges, OnInit{

  constructor(private userService: UserService) {}

  loggedInUser : boolean = this.userService.isUserLoggedIn();

  ngOnInit(): void {
    this.updateLoggedInUserStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    window.location.reload();
    this.updateLoggedInUserStatus();
  }

  updateLoggedInUserStatus(): void {
    this.loggedInUser = this.userService.isUserLoggedIn();
  }

  logout(): void {
    this.userService.logout();
    this.updateLoggedInUserStatus();
  }

}
