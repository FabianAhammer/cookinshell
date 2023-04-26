import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/pages/recipe/recipe.service';
import { IngridientEntry } from 'src/app/types/cooking-entry';
import { BaseEditableComponent } from 'src/app/types/editable-form';
import { IngredientEntryUtility } from 'src/app/utility/ingredient.utility';
import * as uuid from 'uuid';

@Component({
  selector: 'ingredient-entry-detail',
  templateUrl: './ingredient-entry-detail.component.html',
  styleUrls: ['./ingredient-entry-detail.component.scss'],
})
export class IngredientEntryDetailComponent extends BaseEditableComponent<IngridientEntry> {
  public readonly units = ['x', 'g', 'kg', 'ml', 'l'];

  constructor(fb: FormBuilder, public recipeService: RecipeService) {
    super(
      fb.group({
        id: [uuid.v4()],
        amount: [
          null as number,
          [Validators.required, Validators.pattern('[0-9]*')],
        ],
        ingredient: [null as string, [Validators.required]],
        unit: [null as string, [Validators.required]],
      })
    );
  }

  public override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes, IngredientEntryUtility.isOnlyIdSet);
  }

  public override setValueToFormGroup(value: IngridientEntry) {
    this.formGroup.patchValue({
      amount: value?.amount,
      ingredient: value?.ingredient,
      id: value?.id,
      unit: value?.unit,
    });
  }

  public override isValueEmpty(value: IngridientEntry): boolean {
    return IngredientEntryUtility.isOnlyIdSet(value);
  }
}
