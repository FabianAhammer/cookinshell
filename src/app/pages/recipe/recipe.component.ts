import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import {
  CookingEntry,
  CookingStep,
  CookingStepType,
} from 'src/app/types/cooking-entry';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  public editMode: boolean = false;
  public recipe: CookingEntry;

  public editingRecipe: FormArray<FormControl<Partial<CookingStep>>>;

  constructor(route: ActivatedRoute, private dataService: DataService) {
    route.data.subscribe(({ id }) => {
      this.dataService.cookingEntries
        .pipe(map((entry) => entry.find((e) => e.id === id)))
        .subscribe((entry) => {
          this.recipe = entry;
          this.setEntries(entry);
        });
    });
  }

  public addStep() {
    this.recipe.steps.push({
      type: CookingStepType.INSTRUCTION,
      description: null,
      totalTime: null,
      elapsedTime: null,
    });
  }

  public toggleEditMode() {
    if (this.editMode) {
      this.recipe.steps = this.editingRecipe.value;
      this.dataService.updateCookingEntry(this.recipe);
    } else {
      this.setEntries(this.recipe);
    }
    this.editMode = !this.editMode;
  }

  public cancel() {
    this.dataService.cookingEntries
      .pipe(map((entry) => entry.find((e) => e.id === this.recipe.id)))
      .subscribe((entry) => {
        this.recipe = entry;
      });
    this.editMode = false;
  }
  private setEntries(entry: CookingEntry) {
    this.editingRecipe = new FormArray(
      entry.steps.map((step) => new FormControl(step))
    );
  }
}
