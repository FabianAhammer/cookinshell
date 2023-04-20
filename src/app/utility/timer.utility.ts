import * as moment from 'moment';
import { Time } from '../types/timer';
// TODO impl time with HH:MM:SS
export function getTimeString(time: Time | { _seconds: number }): string {
  if (!time?._seconds) {
    return null;
  }
  const totalSeconds = time._seconds;

  // Add hours,moments,seconds to moment object, and humainze the output, return the hh:mm:ss string
  const hours = moment.duration(totalSeconds, 'seconds').hours();
  const minutes = moment.duration(totalSeconds, 'seconds').minutes();
  const seconds = moment.duration(totalSeconds, 'seconds').seconds();

  if (hours < 0 || minutes < 0 || seconds < 0) {
    return `-${toDisplay(hours)}:${toDisplay(minutes)}:${toDisplay(seconds)}`;
  }

  return `${toDisplay(hours)}:${toDisplay(minutes)}:${toDisplay(seconds)}`;
}

export function toDisplay(value: number): string {
  return Math.abs(value).toString().padStart(2, '0');
}
