

import {AbstractControl, ValidationErrors} from '@angular/forms';

export class UsernameValidators {
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
       resolve(null);
    });
  }
}
