import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges, OnInit{

  constructor(private userService: UserService,
    private tokenService: TokenService) {}

  loggedInUser : boolean = this.userService.isUserLoggedIn();

  loggedInUserIsAdmin: boolean = false;

  ngOnInit(): void {
    this.updateLoggedInUserStatus();
    this.loggedInUserIsAdmin = this.isAdmin();
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
    sessionStorage.removeItem('role');
  }

  isAdmin(): boolean{
    if (this.tokenService.getrole() == 'ADMIN') {
      return true;
    } else {
      return false;
    } 
}

}
