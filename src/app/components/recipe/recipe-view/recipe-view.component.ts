import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/types/cooking-entry';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent {
  @Input()
  public recipe: Recipe;

  @Input()
  public totalTime: Observable<number>;

  @Input()
  public elapsedTimePercent: Observable<number>;

  @Output()
  public editRecipe: EventEmitter<void> = new EventEmitter();

  @Output()
  public resetRecipe: EventEmitter<void> = new EventEmitter();

  @Output()
  public deleteRecipe: EventEmitter<void> = new EventEmitter();
}
