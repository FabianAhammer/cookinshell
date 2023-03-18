import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  providers: [RecipeService],
})
export class RecipeComponent {
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
}
