import { Injectable } from '@angular/core';

@Injectable()
export class LowLevelDataAccessService {
  public static readData<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }
  public static writeData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
