import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { NavigationEnd, Route, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges, OnInit{

  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private adminService: AdminService) {}

  loggedInUser : boolean = this.userService.isUserLoggedIn();

  loggedInUserIsAdmin: boolean = false; // Initialize with a default value

  ngOnInit(): void {
    this.updateLoggedInUserStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.adminService.isAdmin().subscribe(isAdmin => {
          this.loggedInUserIsAdmin = isAdmin;
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLoggedInUserStatus();
  }

  updateLoggedInUserStatus(): void {
    setTimeout(() => {
      this.loggedInUser = this.userService.isUserLoggedIn()
      }, 1000);
  }

    logout(): void {
      this.userService.logout();
      this.updateLoggedInUserStatus();
      sessionStorage.removeItem('role');
    }
}
