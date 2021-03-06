import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validationMessages } from '../../common-usage/validation-messages';
import { FirstStepData } from './first-step.model';
import { IMyDpOptions } from 'mydatepicker';
import {
  ageValidator, MaxLengthValidator, MinLengthPhoneValidator,
  MinLengthValidator
} from '../../common-usage/validators';

@Component({
  selector: 'first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  @Output() nextStep = new EventEmitter<FirstStepData>();
  @Output() formChanged = new EventEmitter<boolean>();

  maxDate: any = new Date().toISOString().substring(0,10);
  public mask = ['+', '3', '8', '(', '0', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  validationMessages = validationMessages;
  firstForm: FormGroup;
  firstData: FirstStepData;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.firstForm = this.fb.group({
      name: ['', [Validators.required, MinLengthValidator(2), MaxLengthValidator(15)]],
      surName: ['', [Validators.required, MinLengthValidator(2), MaxLengthValidator(20)]],
      dob: ['', [Validators.required, ageValidator]],
      phone: ['', [Validators.required, MinLengthPhoneValidator(17)]],
      adress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });

    this.firstForm.valueChanges.subscribe(data => {
      this.formChanged.emit();
    })
  }

  submitFirstStep() {
    this.firstData = new FirstStepData(
      this.firstForm.get('name').value,
      this.firstForm.get('surName').value,
      this.firstForm.get('dob').value,
      this.firstForm.get('phone').value,
      this.firstForm.get('adress').value,
      this.firstForm.get('city').value,
      this.firstForm.get('country').value
    );
    this.nextStep.emit(this.firstData);
  }
}
