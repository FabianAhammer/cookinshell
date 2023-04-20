import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../types/timer';
import { getTimeString } from '../utility/timer.utility';

@Pipe({
  name: 'timeByNumberPipe',
})
export class TimeByNumberPipe implements PipeTransform {
  public transform(time: number): string {
    if (!time) return '00:00:00';
    return getTimeString({ _seconds: time });
  }
}
