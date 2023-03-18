import { Ingredient, IngridientEntry } from '../types/cooking-entry';

export class IngredientEntryUtility {
  public static isOnlyIdSet(ingredient: IngridientEntry): boolean {
    return (
      ingredient && ingredient.id && !ingredient.unit && !ingredient.amount
    );
  }
}
