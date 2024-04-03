import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name : 'username'
})

export class UsernamePipe implements PipeTransform {
  constructor() {

  }
  transform(value: {firstname: string, lastname: string}): String {
    return `${value.lastname.toUpperCase} ${value.firstname}`
  }
}

