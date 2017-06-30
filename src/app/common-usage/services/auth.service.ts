import { Injectable } from '@angular/core';
import { logInUser, User } from '../models/user.model';
import { SignUpData } from '../../sign-up-page/sign-up.model';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HandleError } from '../handlers';
import { API_PATH } from '../constants';

@Injectable()
export class AuthService {

  headers: Headers = new Headers();
  options: any;

  currentUser: User[];

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.options = { headers: this.headers };
  }

  getUser(id): Observable<User> {
    return this.http.get(`${API_PATH}/users/${id}`)
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
      .map((resp) => resp.json())
      .catch(HandleError)
  }

  logout() {
    // return this.http.patch(`${API_PATH}/logout`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }

  updateUserInfo(userDate: User) {
    // return this.http.patch(`${API_PATH}/users/${id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }


}
