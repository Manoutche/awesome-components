import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(main: string, confirm:string): ValidatorFn {
  return (crtl: AbstractControl): null | ValidationErrors => {
    if(!crtl.get(main) || !crtl.get(confirm)){
      return {
        confirmEqual: 'Invalid control names'
      }
    }
    const mainValue = crtl.get(main)!.value;
    const confirmValue = crtl.get(confirm)!.value;

    return mainValue === confirmValue ? null : {
      confirmEqual:{
        main: mainValue,
        confirm: confirmValue
      }
    }
  }
}
