import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'field-validator',
  encapsulation: ViewEncapsulation.None,
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
    if (!changes.inputErrors) {
      return
    }
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
