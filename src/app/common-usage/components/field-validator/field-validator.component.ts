import { Component, Input } from '@angular/core';

@Component({
  selector: 'field-validator',
  templateUrl: './field-validator.component.html',
  styleUrls: ['./field-validator.component.scss']
})
export class FieldValidatorComponent {
  @Input() labelText: string = '';
  @Input() inputErrors: any;
  @Input() inputField: any;
  @Input() errorDefs: any;

  errorMessage: string = '';

  ngOnChanges(changes:any): void {
    let errors:any = changes.inputErrors.currentValue;
    this.errorMessage = '';
    if (errors) {
      Object.keys(this.errorDefs).some(key => {
        if (errors[key]) {
          this.errorMessage = this.errorDefs[key];
          return true;
        }
      });
    }
  }
}
