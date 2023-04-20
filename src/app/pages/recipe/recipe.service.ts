import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, filter, map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {
  CookingStep,
  EntryType,
  IngridientEntry,
  OverviewItem,
  Recipe,
} from 'src/app/types/cooking-entry';
import { TypedFormGroup } from 'src/app/types/forms';
import { Time } from 'src/app/types/timer';
import { CookinStepUtil } from 'src/app/utility/cooking-step.utility';
import * as uuid from 'uuid';

@Injectable()
export class RecipeService {
  public formGroup: TypedFormGroup<OverviewItem>;
  private recipe = new BehaviorSubject<Recipe>(null);
  private editMode = new BehaviorSubject<boolean>(false);
  private timerId = new BehaviorSubject<string>(null);
  public $recipe = this.recipe
    .asObservable()
    .pipe(filter((recipe) => recipe !== null));
  public $editMode = this.editMode.asObservable();
  public $timerId = this.timerId.asObservable();

  // Currently used Timer
  private currentTimer = new BehaviorSubject<InternalCookinStepTimer>(null);
  public $currentTimer = this.currentTimer.asObservable();
  public $currentTimerSeconds = this.currentTimer.pipe(
    filter((timer) => timer !== null),
    map((timer) => timer?.seconds || 0)
  );
  // Interval for the timer
  private updateTimer: any = null;

  constructor(private dataService: DataService, fb: FormBuilder) {
    this.formGroup = fb.group({
      id: [uuid.v4()],
      name: [null as string, Validators.required],
      created: [new Date()],
      entryType: [EntryType.ICON],
      previewData: [null],
    });
    this.$recipe.subscribe((recipe) => {
      if (this.haveOverviewItemChanged(recipe))
        this.formGroup.patchValue(recipe);
    });

    this.$timerId.subscribe((id) => {
      if (!id && this.updateTimer) {
        this.stopTimer();
      } else if (id) {
        this.startTimer(this.recipe.value.steps.find((e) => e.id === id));
      }
    });
  }

  public setRecipe(id: string) {
    this.dataService.cookingEntries.subscribe((recipes) => {
      const recipe = recipes.find((recipe) => recipe.id === id);
      this.recipe.next(recipe);
    });
  }
  public saveRecipe(recipe: Recipe) {
    this.dataService.persistRecipe(recipe);
  }

  public deleteRecipe(): void {
    this.dataService.removeRecipe(this.recipe.value);
  }

  public toggleEditMode() {
    this.editMode.next(!this.editMode.value);
  }

  public cancelEditMode() {
    this.editMode.next(false);
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

  public addStep() {
    const recipe = this.recipe.value;
    const steps = recipe.steps;
    steps.push(CookinStepUtil.createCookingStep());
  }

  public saveIngridient(ingridient: IngridientEntry, index: number) {
    if (ingridient === null) {
      this.deleteIngridient(index);
      return;
    }
    const recipe = this.recipe.value;
    const ingridients = recipe.ingredients;
    if (ingridients.find((e) => e.id === ingridient.id)) {
      const index = ingridients.findIndex((e) => e.id === ingridient.id);
      ingridients.splice(index, 1);
      ingridients.splice(index, 0, ingridient);
    } else {
      ingridients.push(ingridient);
    }
    this.saveRecipe(recipe);
    this.recipe.next(recipe);
  }

  public deleteIngridient(index: number) {
    const recipe = this.recipe.value;
    const ingridients = recipe.ingredients;
    ingridients.splice(index, 1);
    this.saveRecipe(recipe);
    this.recipe.next(recipe);
  }

  public addIngridient() {
    const recipe = this.recipe.value;
    const ingridients = recipe.ingredients;
    ingridients.push({
      id: uuid.v4(),
      ingredient: null,
      amount: null,
      unit: null,
    });
  }

  public saveForm() {
    const recipe = this.recipe.value;
    recipe.name = this.formGroup.value.name;
    recipe.created = this.formGroup.value.created;
    this.saveRecipe(recipe);
    this.recipe.next(recipe);
    this.cancelEditMode();
  }

  private haveOverviewItemChanged(recipe: Recipe): boolean {
    return (
      recipe.name !== this.formGroup.value.name ||
      recipe.created !== this.formGroup.value.created ||
      recipe.entryType !== this.formGroup.value.entryType ||
      recipe.previewData !== this.formGroup.value.previewData
    );
  }

  /**
   * Timer service
   */
  public restartAllTimers() {
    this.deactivateCurrentTimer();
    const recipe = this.recipe.value;
    recipe.steps.forEach((step) => {
      step.elapsedTime = null;
    });
    this.saveRecipe(recipe);
  }

  public toggleTimer(id: string) {
    const lastId = this.timerId.value;
    this.deactivateCurrentTimer();
    if (lastId !== id) {
      this.activateCurrentTimer(id);
    }
  }

  public fastForwardStepTimer(id: string): void {
    this.deactivateCurrentTimer();
    const recipe = this.recipe.value;
    const step = recipe.steps.find((e) => e.id === id);
    step.elapsedTime = step.totalTime;
    this.saveRecipe(recipe);
  }

  public resetStepTimer(id: string): void {
    this.deactivateCurrentTimer();
    const recipe = this.recipe.value;
    const step = recipe.steps.find((e) => e.id === id);
    step.elapsedTime = null;
    this.saveRecipe(recipe);
  }

  private activateCurrentTimer(id: string) {
    this.timerId.next(id);
  }
  private deactivateCurrentTimer() {
    this.timerId.next(null);
  }

  private startTimer(step: CookingStep) {
    const startSeconds = step.elapsedTime?._seconds || 0;
    const timer = {
      id: step.id,
      seconds: startSeconds,
    };
    this.currentTimer.next(timer);
    this.updateTimer = setInterval(() => {
      timer.seconds++;
      this.currentTimer.next(timer);
      if (timer.seconds === step.totalTime._seconds) {
        this.stopTimer();
      }
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this.updateTimer);
    const currentTimer = this.currentTimer.value;
    this.currentTimer.next(null);
    const recipe = this.recipe.value;
    const step = recipe.steps.find((e) => e.id === currentTimer?.id);
    if (step) {
      step.elapsedTime = new Time();
      step.elapsedTime._seconds = currentTimer.seconds;
      this.saveRecipe(recipe);
    }
  }
}

interface InternalCookinStepTimer {
  id: string;
  seconds: number;
}
