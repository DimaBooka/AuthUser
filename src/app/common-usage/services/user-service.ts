import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  currentUser: User = new User();
  token: string = '';
  isAuthorized: boolean = false;
  private authSubject = new Subject<any>();

  constructor() {}

  getIsAuthorized(): boolean {
    return this.isAuthorized;
  }

  authorized() {
    this.authSubject.next(this.isAuthorized);
  }

  getAuthorized(): Observable<any> {
    return this.authSubject.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  clearToken() {
    localStorage.removeItem('token');
    this.token = '';
  }

  getToken() {
    return this.token;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    this.isAuthorized = true;
  }

  getCurrentUser (): User {
    return this.currentUser;
  }

  clearCurrentUer () {
    this.currentUser = new User();
    this.isAuthorized = false;
  }

}
