import { Routes } from '@angular/router';
import { LoginComponent } from './login-page/login.component';
import { SignUpComponent } from './sign-up-page/sign-up.component';
import { EditProfileComponent } from './edit-profile-page/edit-profile.component';
import { NoContentComponent } from './no-content/no-content.component';
import { AuthGuard } from './guards/onlyAuth';
import { NoAuthGuard } from './guards/onlyNotAuth';
import { DeactivateSignUpGuard } from './guards/deactivateSignUp';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NoAuthGuard],
    canDeactivate: [DeactivateSignUpGuard]
  },
  { path: 'profile', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoContentComponent },
];
