import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/utility/navigation-helper.utility';
import { RecipeService } from './recipe.service';

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

  public toggleEditMode() {
    this.recipeService.toggleEditMode();
  }

  public addStep() {
    this.recipeService.addStep();
  }

  public deleteRecipe() {
    this.recipeService.deleteRecipe();
    this.navigationHelper.navigateBack();
  }
}
