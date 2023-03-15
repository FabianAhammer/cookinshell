import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookingEntry, EntryType, OverviewItem } from '../types/cooking-entry';
import { LowLevelDataAccessService } from './low-level-data-access.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly DATA_TOKEN = 'COOKING_SHELL_DATA';

  private _overviewItems = new BehaviorSubject<CookingEntry[]>([]);

  public overviewItems: Observable<OverviewItem[]> = this._overviewItems;
  public cookingEntries: Observable<CookingEntry[]> = this._overviewItems;
  constructor() {
    this.loadData();
  }

  public loadData() {
    this._overviewItems.next(
      LowLevelDataAccessService.readData(this.DATA_TOKEN)
    );
  }

  public addEntry(entry: CookingEntry): void {
    const entries = this._overviewItems.value ?? [];
    entries.push(entry);
    this._overviewItems.next(entries);
    this.saveData();
  }

  public removeEntry(entry: CookingEntry): void {
    const entries = this._overviewItems.value;
    const index = entries.indexOf(entry);
    if (index !== -1) {
      entries.splice(index, 1);
      this._overviewItems.next(entries);
    }
    this.saveData();
  }

  public updateCookingEntry(entry: CookingEntry): void {
    const entries = this._overviewItems.value;
    const index =
      entries
        .map((e, i) => {
          return { id: e.id, index: i };
        })
        .find((e) => e.id === entry.id)?.index ?? -1;
    if (index !== -1) {
      entries[index] = entry;
      this._overviewItems.next(entries);
    }
    this.saveData();
  }

  private saveData(): void {
    LowLevelDataAccessService.writeData(
      this.DATA_TOKEN,
      this._overviewItems.value
    );
    this.loadData();
  }
}
