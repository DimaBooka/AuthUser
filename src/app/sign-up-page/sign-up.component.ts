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
  formsChanged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  goTo2Step(firstStepData: FirstStepData) {
    this.firstStep = false;
    this.firstStepData = firstStepData;
  }

  finishRegister(secondStepData: SecondStepData) {
    this.secondStepData = secondStepData;
    this.signUpData = new SignUpData(Object.assign(this.firstStepData, this.secondStepData));
    console.log(this.signUpData);
    this.authService.signUp(this.signUpData).subscribe(
      resp => {
        console.log(resp);
        return this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      });
  }

  firstStepChanged() {
    this.formsChanged = true;
  }

  public hasChanges() {
    return this.formsChanged;
  }
}
