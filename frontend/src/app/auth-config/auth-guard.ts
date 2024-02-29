import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

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
}
