import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../types/timer';
import { getTimeString } from '../utility/timer.utility';

@Pipe({
  name: 'timeDifference',
})
export class TimeDifferencePipe implements PipeTransform {
  public transform(currentTime: Time, endTime: Time): any {
    return getTimeString({
      _seconds: (endTime?._seconds || 0) - (currentTime?._seconds || 0),
    });
  }
}
