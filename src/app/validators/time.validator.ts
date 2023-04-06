import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

//Validator checks the value for HH:MM:SS format

export function enteredTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(
      control.value
    );
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
