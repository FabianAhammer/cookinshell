import { CookingStep } from '../types/cooking-entry';
import * as uuid from 'uuid';

export class CookinStepUtil {
  public static createCookingStep(): CookingStep {
    return {
      id: uuid.v4(),
      description: null,
      title: null,
      totalTime: null,
      elapsedTime: null,
      completed: false,
    };
  }
  public static isOnlyIdSet(cookingStep: CookingStep): boolean {
    return (
      cookingStep.description === null &&
      cookingStep.title === null &&
      cookingStep.totalTime === null &&
      cookingStep.elapsedTime === null
    );
  }
}
