import { Time } from '../types/timer';

export function getTimeString(time: Time): string {
  const _seconds = time.seconds;
  const hours = Math.floor(_seconds / 3600);
  const minutes = Math.floor((_seconds % 3600) / 60);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
