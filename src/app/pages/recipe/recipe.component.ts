import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/utility/navigation-helper.utility';
import { RecipeService } from './recipe.service';
import { Observable, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  providers: [RecipeService],
})
export class RecipeComponent {
  private navigationHelper = new NavigationHelper();
  constructor(route: ActivatedRoute, public recipeService: RecipeService) {
    route.data.subscribe(({ id }) => {
      this.recipeService.setRecipe(id);
    });
  }

  public get totalTime(): Observable<number> {
    return this.recipeService.$recipe.pipe(
      filter((recipe) => !!recipe),
      map((recipe) =>
        recipe.steps.reduce(
          (totalTime, step2) => totalTime + (step2?.totalTime?._seconds || 0),
          0
        )
      )
    );
  }

  public get timersElapsed(): Observable<boolean> {
    return this.recipeService.$recipe.pipe(
      filter((recipe) => !!recipe),
      map((recipe) =>
        recipe.steps.reduce(
          (restartAllTimers, step2) =>
            restartAllTimers || step2?.elapsedTime?._seconds > 0,
          false
        )
      )
    );
  }

  public restartAllTimers() {
    this.recipeService.restartAllTimers();
  }

  public toggleEditMode() {
    this.recipeService.toggleEditMode();
  }

  public edit() {
    this.recipeService.toggleEditMode();
  }
  public cancel() {
    this.recipeService.cancelEditMode();
  }

  public save() {
    this.recipeService.saveForm();
  }

  public addStep() {
    this.recipeService.addStep();
  }

  public addIngridient() {
    this.recipeService.addIngridient();
  }

  public deleteRecipe() {
    this.recipeService.deleteRecipe();
    this.navigationHelper.navigateBack();
  }
}
