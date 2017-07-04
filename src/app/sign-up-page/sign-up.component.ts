import {Component, Output} from '@angular/core';
import { FirstStepData } from './first-step/first-step.model';
import { SecondStepData } from './second-step/second-step.model';
import { SignUpData } from './sign-up.model';
import { AuthService } from '../common-usage/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  firstStep: boolean = true;
  firstStepData: FirstStepData;
  secondStepData: SecondStepData;
  signUpData: SignUpData = new SignUpData({});
  formChanged: boolean = false;
  formSubmited: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  goTo2Step(firstStepData: FirstStepData) {
    this.firstStep = false;
    this.firstStepData = firstStepData;
  }

  finishRegister(secondStepData: SecondStepData) {
    this.secondStepData = secondStepData;
    this.signUpData = new SignUpData(Object.assign(this.firstStepData, this.secondStepData));
    this.authService.signUp(this.signUpData).subscribe(
      resp => {
        return this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      });
  }

  firstStepChanged() {
    this.formChanged = true;
  }

  secondStepSubmit () {
    this.formSubmited = true;
  };

  public hasChanges() {
    return this.formChanged && !this.formSubmited;
  }
}
