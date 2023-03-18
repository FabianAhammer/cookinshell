import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { CookingStep, Recipe } from 'src/app/types/cooking-entry';
import { CookinStepUtil } from 'src/app/utility/cooking-step.utility';

@Injectable()
export class RecipeService {
  private recipe = new BehaviorSubject<Recipe>(null);
  private editMode = new BehaviorSubject<boolean>(false);
  public $recipe = this.recipe
    .asObservable()
    .pipe(filter((recipe) => recipe !== null));
  public $editMode = this.editMode.asObservable();

  constructor(private dataService: DataService) {}

  public setRecipe(id: string) {
    this.dataService.cookingEntries.subscribe((recipes) => {
      const recipe = recipes.find((recipe) => recipe.id === id);
      this.recipe.next(recipe);
    });
  }

  public deleteRecipe(): void {
    this.dataService.removeRecipe(this.recipe.value);
  }

  public toggleEditMode() {
    this.editMode.next(!this.editMode.value);
  }

  /**
   * Saves the cooking step to the recipe and persists the recipe, if null is passed in the cooking step is deleted
   *
   * @param cookingStep
   * @param index
   */
  public saveStep(cookingStep: CookingStep, index: number) {
    if (cookingStep === null) {
      this.deleteStep(index);
      return;
    }
    const recipe = this.recipe.value;
    const steps = recipe.steps;
    if (steps.find((e) => e.id === cookingStep.id)) {
      const index = steps.findIndex((e) => e.id === cookingStep.id);
      steps.splice(index, 1);
      steps.splice(index, 0, cookingStep);
    } else {
      steps.push(cookingStep);
    }
    this.saveRecipe(recipe);
    this.recipe.next(recipe);
  }

  public deleteStep(index: number) {
    const recipe = this.recipe.value;
    const steps = recipe.steps;
    steps.splice(index, 1);
    this.saveRecipe(recipe);
    this.recipe.next(recipe);
  }

  public saveRecipe(recipe: Recipe) {
    this.dataService.persistRecipe(recipe);
  }

  public addStep() {
    const recipe = this.recipe.value;
    const steps = recipe.steps;
    steps.push(CookinStepUtil.createCookingStep());
  }
}
