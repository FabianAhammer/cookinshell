export class Time {
  private _seconds: number;

  constructor(timestring?: string) {
    if (timestring) {
      this._seconds = this.parseTime(timestring);
    }
  }
  public getTimeString(): string {
    const hours = Math.floor(this._seconds / 3600);
    const minutes = Math.floor((this._seconds % 3600) / 60);
    // const seconds = this._seconds % 60;
    // ${seconds.toString().padStart(2, '0')}
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  public setTime(time: string): void {
    this._seconds = this.parseTime(time);
  }

  private parseTime(time: string): number {
    const timeParts = time.split(':');
    if (timeParts.length === 2) {
      return parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
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
