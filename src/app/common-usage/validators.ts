import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ageValidator(c: AbstractControl) {
  let date = new Date();
  if (c.value && c.value.date && date.getFullYear() - c.value.date.year < 18) {
    return {'ageValidator' : true}
  }
  return null
}

export function passwordConfirmValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    if (c.parent && c.value !== c.parent.get(param).value) {
      return {noMatch: true};
    }
    return null;
  };
}

export function symbolsValidator(c: AbstractControl) {
  if (c.value && !/^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9]+)$/.test(c.value)) {
    return {symbolsValidator : true}
  }
  return null
}

export function MaxLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.length > length - 1) {
      return {'MaxLength' : true}
    }
    return null;
  }
}

export function MinLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.length < length) {
      return {'MinLength' : true}
    }
    return null;
  }
}

export function MinLengthPhoneValidator(length: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    if (control.value && control.value.replace(/_/g, '').length < length) {
      return {'MinPhoneLength' : true}
    }
    return null;
  }
}

export function employedRequiredValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    if (c.parent && c.parent.get(param).value == 'employed' && !c.value) {
      return {requiredPlace: true};
    }
    return null;
  };
}

export function placeRequiredValidator(param: any): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    if (c.parent && !c.parent.get(param).value && c.value != 'employed') {
      c.parent.get(param).setValue('default');
    } else if (c.parent && c.parent.get(param).value && c.value == 'employed') {
      c.parent.get(param).setValue(undefined);
    }
    return null;
  };
}

export function placeRequiredProfileValidator(param: any, place: string): ValidatorFn {
  return (c: AbstractControl) : {[key: string]: boolean} | null => {
    if (c.parent && !c.parent.get(param).value && c.value != 'employed') {
      c.parent.get(param).setValue('default');
    } else if (c.parent && c.parent.get(param).value && c.value == 'employed') {
      c.parent.get(param).setValue(place);
    }
    return null;
  };
}
