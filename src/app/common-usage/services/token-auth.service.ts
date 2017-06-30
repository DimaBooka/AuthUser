import { Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { UserService } from './user-service';

@Injectable()
export class TokenHttp extends Http {

  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions,
              private userService: UserService) {
    super(_backend, _defaultOptions);
  }

  public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let user = this.userService.getCurrentUser();
    if(user.token){
      if (options) {
        options.headers.set('Authorization', 'Token ' + user.token);
      } else {
        (<Request> url).headers.set('Authorization', 'Token ' + user.token);
      }
    }
    return super.request(url, options);
  }
}
