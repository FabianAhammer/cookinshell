import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../types/timer';
import { getTimeString } from '../utility/timer.utility';

@Pipe({
  name: 'time',
})
export class TimePipePipe implements PipeTransform {
  public transform(time: Time | undefined): string {
    if (!time) return '00:00:00';
    return getTimeString(time);
  }
}
