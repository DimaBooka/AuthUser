import { CanDeactivate } from '@angular/router';
import { SignUpComponent } from '../sign-up-page/sign-up.component';
import { Injectable } from '@angular/core';

@Injectable()
export class DeactivateSignUpGuard implements CanDeactivate<SignUpComponent> {

  canDeactivate(target: SignUpComponent) {
    if(target.hasChanges()){
      return window.confirm('Do you really want to cancel?');
    }
    return true;
  }
}
