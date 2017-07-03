import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class ProfileResolve implements Resolve<User> {

  constructor(private authService: AuthService) {}

  resolve(): Observable<any> | Promise<any> | any  {
    return this.authService.getUser();
  }
}
