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
   * Returns the timer which has the smallest value
   * @param other
   * @returns
   */
  public compare(other: Time): number {
    if (this._seconds < other._seconds) {
      return -1;
    }
    if (this._seconds > other._seconds) {
      return 1;
    }
    return 0;
  }
}
