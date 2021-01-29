import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipes'
})
export class DatePipesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
