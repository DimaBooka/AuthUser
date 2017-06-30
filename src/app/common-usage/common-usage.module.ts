import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { UserService } from './services/user-service';
import { TokenHttp } from './services/token-auth.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [

  ],
  providers: [
    {
      provide: Http,
      useClass: TokenHttp,
      deps: [XHRBackend, RequestOptions, UserService]
    },
    UserService,
    AuthService
  ]
})
export class CommonUsageModule {

}
