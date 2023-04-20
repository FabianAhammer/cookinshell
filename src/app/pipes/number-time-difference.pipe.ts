import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../types/timer';
import { getTimeString } from '../utility/timer.utility';

@Pipe({
  name: 'numberTimeDifference',
})
export class NumberTimeDifferencePipe implements PipeTransform {
  public transform(currentTime: number, endTime: Time): string {
    return getTimeString({
      _seconds: (endTime?._seconds || 0) - (currentTime || 0),
    });
  }
}
