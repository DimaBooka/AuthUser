import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { UserService } from './services/user-service';
import { TokenHttp } from './services/token-auth.service';
import { AuthService } from './services/auth.service';
import { FieldValidatorComponent } from './components/field-validator/field-validator.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    FieldValidatorComponent
  ],
  providers: [
    {
      provide: Http,
      useClass: TokenHttp,
      deps: [XHRBackend, RequestOptions, UserService]
    },
    UserService,
    AuthService
  ],
  exports: [
    FieldValidatorComponent
  ]
})
export class CommonUsageModule {

}
