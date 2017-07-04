import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile-page/edit-profile.component';
import { LoginComponent } from './login-page/login.component';
import { SignUpComponent } from './sign-up-page/sign-up.component';
import { NoContentComponent } from './no-content/no-content.component';
import { CommonUsageModule } from './common-usage/common-usage.module';
import { HeaderComponent } from './header-page/header-page.component';
import { FirstStepComponent } from './sign-up-page/first-step/first-step.component';
import { SecondStepComponent } from './sign-up-page/second-step/second-step.component';
import { AuthGuard } from './guards/onlyAuth';
import { NoAuthGuard } from './guards/onlyNotAuth';
import { DeactivateSignUpGuard } from './guards/deactivateSignUp';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditProfileComponent,
    LoginComponent,
    SignUpComponent,
    NoContentComponent,
    FirstStepComponent,
    SecondStepComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    NguiDatetimePickerModule,
    TextMaskModule,
    FormsModule,
    CommonUsageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    DeactivateSignUpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
