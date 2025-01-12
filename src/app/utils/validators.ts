import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validatePassword(control: AbstractControl) {
    const value = control.value
    if (!containsNumber(value)) {
      return { invalid_password: true }
    }

    return null
  }

  static matchPassword(control: AbstractControl) {
    const password = control.get('password').value
    const confirmPassword = control.get('confirmPassword').value
    if (password === confirmPassword){
      return null
    }
    return { match_password: true }
    
  }

}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10))
}

function containsNumber(value: string) {
  return value.split('').find(v => isNumber(v)) !== undefined
}