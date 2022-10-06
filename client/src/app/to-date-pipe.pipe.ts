import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDatePipe'
})
export class ToDatePipePipe implements PipeTransform {


  transform(value: string, ...args: unknown[]): String {

    const time = Number(value);
    if (time == 0) {
      return 'now';
    } else {
      return String(time / 100) + ' H';
    }

  }

}
