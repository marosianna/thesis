import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('rePassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};