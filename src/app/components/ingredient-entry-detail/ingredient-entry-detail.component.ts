import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  constructor(fb: FormBuilder) {
    super(
      fb.group({
        id: [uuid.v4()],
        amount: [null as number],
        ingredient: [null as string],
        unit: [null as string],
      })
    );
  }

  public override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes, IngredientEntryUtility.isOnlyIdSet);
  }
}
