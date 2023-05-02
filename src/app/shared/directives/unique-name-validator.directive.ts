import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueNameValidator(bannedWords: string[] = []): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const banned = bannedWords.find(word => word.toLocaleLowerCase() === control.value?.toLocaleLowerCase());
    return banned ? {uniqueNameValidator : {isBanned: banned}} : null;
  };
}
