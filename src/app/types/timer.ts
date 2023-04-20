export class Time {
  public _seconds: number;

  constructor(timestring?: string) {
    if (timestring) {
      this._seconds = this.parseTime(timestring);
    }
  }

  public setTime(time: string): void {
    this._seconds = this.parseTime(time);
  }

  private parseTime(time: string): number {
    const timeParts = time.split(':');
    if (timeParts.length === 3) {
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      const seconds = parseInt(timeParts[2]);
      if (hours >= 0 || minutes >= 0 || seconds >= 0) {
        return hours * 3600 + minutes * 60 + seconds;
      }
      return 0;
    }
    throw 'Failed to parse timer?';
  }

  /**
   * @returns
   * 1 if the current time is greater than the other time
   * -1 if the current time is less than the other time
   * 0 if they are equal
   */
  public static compare(first: Time, second: Time): number {
    if ((first?._seconds || 0) < (second?._seconds || 0)) {
      return -1;
    }
    if ((first?._seconds || 0) > (second?._seconds || 0)) {
      return 1;
    }
    return 0;
  }

  public static fromSeconds(seconds: number): Time {
    const time = new Time();
    time._seconds = seconds;
    return time;
  }
}
