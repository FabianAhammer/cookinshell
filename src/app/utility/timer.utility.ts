import { Time } from '../types/timer';
// TODO impl time with HH:MM:SS
export function getTimeString(time: Time): string {
  const _seconds = time.seconds;
  const seconds = Math.floor(_seconds / 3600);
  const minutes = Math.floor((_seconds % 3600) / 60);
  const hours = Math.floor(_seconds / 3600);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
