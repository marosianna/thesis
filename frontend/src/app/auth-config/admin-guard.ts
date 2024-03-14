import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';


@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
  
    constructor(private userService: UserService, private router: Router) {}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (this.userService.isAdmin()) {
        return true;
      } else {
        this.router.navigate(['admin']); 
        return false;
      }
    }
    
  }