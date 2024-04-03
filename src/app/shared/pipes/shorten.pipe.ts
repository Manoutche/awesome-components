import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name : 'shorten'
})

export class ShortenPipe implements PipeTransform {
  constructor() {

  }
  transform(value: string,maxLength: number = 100):any {
    if (value.length <= maxLength) {
      return value
    }
    return value.substring(0,maxLength) + '...';
  }
}
