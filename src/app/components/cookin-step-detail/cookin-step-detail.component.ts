import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecipeService } from 'src/app/pages/recipe/recipe.service';
import { CookingStep } from 'src/app/types/cooking-entry';
import { BaseEditableComponent } from 'src/app/types/editable-form';
import { TypedFormGroup } from 'src/app/types/forms';
import { CookinStepUtil } from 'src/app/utility/cooking-step.utility';
import * as uuid from 'uuid';

@Component({
  selector: 'cookin-step-detail',
  templateUrl: './cookin-step-detail.component.html',
  styleUrls: ['./cookin-step-detail.component.scss'],
})
export class CookinStepDetailComponent extends BaseEditableComponent<CookingStep> {
  constructor(fb: FormBuilder, public recipeService: RecipeService) {
    super();
    this.formGroup = fb.group({
      id: [uuid.v4()],
      description: [null as string],
      title: [null as string],
      totalTime: [null as string],
      elapsedTime: [null as string],
    });
  }
  // Create ng on changes method adding data to the form group
  public override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes, CookinStepUtil.isOnlyIdSet);
  }
}
