import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { UserService } from '../common-usage/services/user-service';
import { Injectable } from '@angular/core';

@Injectable()
export class NoAuthGuard implements CanActivate{

  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.getToken()) {
      return true;
    }
    this.router.navigate(['/profile']);
    return false;
  }
}
