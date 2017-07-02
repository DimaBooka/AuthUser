import { Injectable } from '@angular/core';
import { logInUser, User } from '../models/user.model';
import { SignUpData } from '../../sign-up-page/sign-up.model';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HandleError } from '../handlers';
import { API_PATH } from '../constants';
import { UserService } from './user-service';

@Injectable()
export class AuthService {

  headers: Headers = new Headers();
  options: any;

  currentUser: User[];

  constructor(private http: Http, private userService: UserService) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = { headers: this.headers };
  }

  getUser(): Observable<User> {
    return this.http.get(`${API_PATH}/users/me`)
      .map((resp: Response) => {
        return resp.json();
      })
      .catch(HandleError);
  }

  signUp(signUpData: SignUpData) {
    return this.http.post(`${API_PATH}/sign-up`, JSON.stringify(signUpData), this.options)
      .map((resp) => resp.json())
      .catch(HandleError)
  }

  login(logInData: logInUser) {
    return this.http.post(`${API_PATH}/login`, JSON.stringify(logInData), this.options)
      .map((resp) => {
      resp = resp.json();
      // this.userService.setCurrentUser();
      return resp
    })
      .catch(HandleError)
  }

  logout() {
    this.userService.clearCurrentUer();
    this.userService.clearToken();
    this.userService.authorized();
  }

  updateUserInfo(userDate: User) {
    // return this.http.patch(`${API_PATH}/users/${id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }


}
