import {AbstractControl, ValidationErrors} from '@angular/forms';

export class UsernameValidators {
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      return resolve(null);
      // setTimeout(() => {
      //   if (control.value === 'snake') {
      //     resolve({shouldBeUnique: true});
      //   }
      //   resolve(null);
      // }, 2000);
    });
  }
}
