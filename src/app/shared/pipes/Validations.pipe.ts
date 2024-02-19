import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'Validations',
  pure: false
})
export class ValidationsPipe implements PipeTransform {

  transform(control?: AbstractControl | null, name:string = "field"): any {
    if(control && control.errors &&control.touched)
      return this.getErrorMessage(control.errors, name)
    
    return ''
  }

  getErrorMessage(errors: any, name:string){
    let error = ""

    let key = Object.keys(errors)[0];

    switch(key){
      case 'required':
        error = `${name} required`
        break;

      case 'minlength':
        error = `${name} needs at least ${ errors[key].requiredLength } characters`
        break;

      case 'min': 
        error = `the minimum value for ${name} is: ${ errors[key].min }`
        break;
    }

    return error
  }

}
