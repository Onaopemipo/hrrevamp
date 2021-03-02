import { Pipe, PipeTransform } from '@angular/core';
import { threadId } from 'worker_threads';

@Pipe({
  name: 'datePipes'
})
export class DatePipesPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    // todo, this function needs update
    const today = new Date();
    if (value.getDate() === today.getDate()) {
      return `${value.getHours()}:${value.getMinutes()}`;
    } else {
      return value.toDateString();
    }
  }

}
