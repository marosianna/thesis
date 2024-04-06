import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "../services/user.service";
import { TokenService } from "../services/token.service";
import { Observable, map } from "rxjs";
import { AdminService } from "../services/admin.service";

@Injectable()
export class AuthGuard implements CanActivate {
/*

  constructor(private userService: UserService, private router: Router) { }
  canActivate() {
    if (this.userService.isUserLoggedIn()) {
      return true;
    } else {
      this.userService.logout();
      this.router.navigate(['']);
      return false;
    }
  }
  */

  constructor(private tokenService: TokenService,
     private router: Router,
      private userService: UserService,
      private adminService: AdminService) { }

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      
  
    /*if (this.userService.isUserLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'admin') {
          if (this.tokenService.getrole() == 'ADMIN') {
            return true; 
          } else {
            this.router.navigate(['/user/examination']); 
            return false; 
          }
        }
        else if (menu == 'user') {
          if (this.tokenService.getrole() == 'USER') {
            return true;
          } else {
            this.router.navigate(['/admin/examination']); 
            return false; 
          }
        } else {
          if (this.tokenService.getrole() == 'USER') {
            this.router.navigate(['/user/examination']);
            return true;
          } else if(this.tokenService.getrole() == 'ADMIN'){
            this.router.navigate(['/admin/examination']);
            return true;
          }
        }
      }
      return true;
    } 
    else {
      this.userService.logout();
      this.router.navigate(['login']);
      return false; 
    }*/

    return new Promise<boolean>((resolve, reject) => {
      this.adminService.isLoggedIn().subscribe(isLoggedIn => {
        if (isLoggedIn) {
          if (route.url.length > 0) {
            let menu = route.url[0].path;
            this.adminService.isAdmin().subscribe(isAdmin => {
              if (menu == 'admin') {
                if (isAdmin) {
                  resolve(true);
                } else {
                  this.router.navigate(['/user/examination']); 
                  resolve(false); 
                }
              }
              else if (menu == 'user') {
                if (!isAdmin) {
                  resolve(true);
                } else {
                  this.router.navigate(['/admin/examination']); 
                  resolve(false); 
                }
              } else {
                if (!isAdmin) {
                  this.router.navigate(['/user/examination']);
                  resolve(true);
                } else if(isAdmin){
                  this.router.navigate(['/admin/examination']);
                  resolve(true);
                }
              }
            });
          }
          resolve(true);
        } else {
          this.userService.logout();
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}
