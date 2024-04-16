import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "../services/user.service";
import { Observable, map } from "rxjs";
import { AdminService } from "../services/admin.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private userService: UserService,
      private adminService: AdminService) { }

  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      
    return new Promise<boolean>((resolve) => {
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
