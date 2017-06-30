import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  currentUser: User;
  token: string;
  constructor() {}

  setToken(token: string) {
    this.token = token;
  }

  clearTokent() {
    this.token = '';
  }

  getToken() {
    return this.token;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrentUser (): User {
    // return this.http.patch(`${API_PATH}/${item.id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
    return this.currentUser;
  }

  clearCurrentUer () {
    // return this.http.patch(`${API_PATH}/${item.id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }

}
