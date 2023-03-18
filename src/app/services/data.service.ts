import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe, EntryType, OverviewItem } from '../types/cooking-entry';
import { LowLevelDataAccessService } from './low-level-data-access.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly DATA_TOKEN = 'COOKING_SHELL_DATA';

  private _recipes = new BehaviorSubject<Recipe[]>([]);

  public overviewItems: Observable<OverviewItem[]> = this._recipes;
  public cookingEntries: Observable<Recipe[]> = this._recipes;
  constructor() {
    this.loadData();
  }

  public loadData() {
    this._recipes.next(LowLevelDataAccessService.readData(this.DATA_TOKEN));
  }

  public addRecipe(entry: Recipe): void {
    const entries = this._recipes.value ?? [];
    entries.push(entry);
    this._recipes.next(entries);
    this.saveData();
  }

  /**
   * This method is used to remove a recipe from the data service.
   * @param recipe
   */
  public removeRecipe(recipe: Recipe): void {
    const recipes = this._recipes.value;
    const index = recipes.indexOf(recipe);
    if (index !== -1) {
      recipes.splice(index, 1);
      this._recipes.next(recipes);
    }
    this.saveData();
  }

  /**
   * This method is used to persist a recipe. If the recipe already exists, it will be updated. Otherwise it will be added.
   * @param recipe The recipe to persist
   */
  public persistRecipe(recipe: Recipe): void {
    const recipes = this._recipes.value;

    if (recipes?.find((_recipe) => _recipe.id === recipe.id)) {
      let position = recipes.findIndex((_recipe) => _recipe.id === recipe.id);
      recipes.splice(position, 1);
      recipes.splice(position, 0, recipe);
    } else {
      recipes.push(recipe);
    }
    this._recipes.next(recipes);
    this.saveData();
  }
  private saveData(): void {
    LowLevelDataAccessService.writeData(this.DATA_TOKEN, this._recipes.value);
  }
}
