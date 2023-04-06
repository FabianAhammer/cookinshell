import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RecipeService } from 'src/app/pages/recipe/recipe.service';
import { CookingStep } from 'src/app/types/cooking-entry';
import { BaseEditableComponent } from 'src/app/types/editable-form';
import { Time } from 'src/app/types/timer';
import { CookinStepUtil } from 'src/app/utility/cooking-step.utility';
import * as uuid from 'uuid';

@Component({
  selector: 'cookin-step-detail',
  templateUrl: './cookin-step-detail.component.html',
  styleUrls: ['./cookin-step-detail.component.scss'],
})
export class CookinStepDetailComponent extends BaseEditableComponent<CookingStep> {
  constructor(fb: FormBuilder, public recipeService: RecipeService) {
    super(
      fb.group({
        id: [uuid.v4()],
        description: [null as string],
        title: [null as string],
        totalTime: [null as Time],
        elapsedTime: [null as Time],
      })
    );
  }
  // Create ng on changes method adding data to the form group
  public override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes, CookinStepUtil.isOnlyIdSet);
  }

  public override setValueToFormGroup(value: CookingStep) {
    console.warn('setValueToFormGroup', value);
    this.formGroup.patchValue({
      description: value.description,
      title: value.title,
      id: value.id,
      totalTime: value.totalTime,
      elapsedTime: value.elapsedTime,
    });
  }
}
