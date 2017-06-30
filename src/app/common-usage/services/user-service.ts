import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  currentUser: User;

  constructor() {}

  setToken(token) {
    // return this.http.patch(`${API_PATH}/${item.id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }

  clearToken() {
    // return this.http.patch(`${API_PATH}/${item.id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }

  getCurrentUser (): User {
    // return this.http.patch(`${API_PATH}/${item.id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
    return new User({token:''});
  }

  clearCurrentUer () {
    // return this.http.patch(`${API_PATH}/${item.id}`, JSON.stringify(item), this.options)
    //   .map((resp) => resp.json())
    //   .catch(HandleError)
  }

}
