import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const matchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password?.value === confirmPassword?.value ? null : { matchPassword: true };
};
