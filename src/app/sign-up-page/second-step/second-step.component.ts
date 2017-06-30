import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../common-usage/validation-messages';
import { SecondStepData } from './second-step.model';
import {
  employedRequiredValidator,
  MaxLengthValidator, MinLengthValidator,
  passwordConfirmValidator, placeRequiredValidator, symbolsValidator
} from '../../common-usage/validators';


@Component({
  selector: 'second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  @Output() finishSignUP = new EventEmitter<SecondStepData>();

  validationMessages = validationMessages;
  secondForm: FormGroup;
  serverError: string;
  secondData: SecondStepData;
  showPlaceField: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.secondForm = this.fb.group({
      username: ['', [Validators.required, MinLengthValidator(2), MaxLengthValidator(15)]],
      password: ['', [Validators.required, symbolsValidator, MinLengthValidator(6)]],
      passwordConfirm: ['', [Validators.required, passwordConfirmValidator('password')]],
      employmentStatus: ['', [Validators.required, placeRequiredValidator('employmentPlace')]],
      employmentPlace: ['', [employedRequiredValidator('employmentStatus')]],
      annualIncome: ['', [Validators.required]],
      favouriteSport: ['', []],
      acceptTerms: ['', [Validators.required]]
    });
  }

  checkStatusValue(e) {
    this.showPlaceField = e.target.value == 'employed';
  }

  submitSecondStep() {
    this.secondData = new SecondStepData(
      this.secondForm.get('username').value,
      this.secondForm.get('password').value,
      this.secondForm.get('passwordConfirm').value,
      this.secondForm.get('employmentStatus').value,
      this.secondForm.get('employmentPlace').value,
      this.secondForm.get('annualIncome').value,
      this.secondForm.get('favouriteSport').value,
      this.secondForm.get('acceptTerms').value
    );
    this.finishSignUP.emit(this.secondData);
  }
}
