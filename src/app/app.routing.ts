import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login.component';
import { SignUpComponent } from './sign-up-page/sign-up.component';
import { EditProfileComponent } from './edit-profile-page/edit-profile.component';
import { NoContentComponent } from './no-content/no-content.component';


export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: EditProfileComponent },
  { path: '**', component: NoContentComponent },
];
