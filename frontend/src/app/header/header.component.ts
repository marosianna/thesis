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

  loggedInUserIsAdmin: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.userService.isUserLoggedIn()){
        this.adminService.isAdmin().subscribe(isAdmin => {
          this.loggedInUserIsAdmin = isAdmin; 
        });
        this.updateLoggedInUserStatus();
      }
    }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.userService.isUserLoggedIn()){
        this.updateLoggedInUserStatus();
      }
    }
    });
  }

  updateLoggedInUserStatus(): void {
    setTimeout(() => {
      this.adminService.isLoggedIn().subscribe(isLoggedIn => {
        this.loggedInUser = isLoggedIn;
      });
      }, 500);
      if (this.loggedInUser) {
        this.adminService.isAdmin().subscribe(isAdmin => {
          this.loggedInUserIsAdmin = isAdmin;
        });
      }
  }

    logout(): void {
      this.loggedInUser = false;
      this.userService.logout();
      sessionStorage.removeItem('role');
    }
}
