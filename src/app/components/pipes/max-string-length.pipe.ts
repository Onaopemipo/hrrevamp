import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxStringLength'
})
export class MaxStringLengthPipe implements PipeTransform {

  transform(value: string, numberOfChars: number): unknown {
    if (value.length > numberOfChars) {
      return value.substr(0, numberOfChars) + '...';
    }
    return value;
  }

}
