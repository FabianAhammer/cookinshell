import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookingStep, CookingStepType } from 'src/app/types/cooking-entry';
import { TypedFormGroup } from 'src/app/types/forms';

@Component({
  selector: 'cookin-step-edit',
  templateUrl: './cookin-step-edit.component.html',
  styleUrls: ['./cookin-step-edit.component.scss'],
})
export class CookinStepEditComponent {
  public readonly CookingStepType = CookingStepType;

  public cookingStepForm: TypedFormGroup<CookingStep>;

  @Input()
  public cookingStep: Partial<CookingStep> = {
    type: CookingStepType.INSTRUCTION,
    description: null,
    totalTime: null,
    elapsedTime: null,
  };

  @Output()
  public cookingStepChange = new EventEmitter<Partial<CookingStep>>();

  constructor(fb: FormBuilder) {
    this.cookingStepForm = fb.group({
      type: [this.cookingStep.type],
      description: [this.cookingStep.description],
      totalTime: [this.cookingStep.totalTime],
      elapsedTime: [this.cookingStep.elapsedTime],
    });

    this.cookingStepForm.controls.type.valueChanges.subscribe((value) => {
      if (value === CookingStepType.INSTRUCTION) {
        this.cookingStepForm.controls.totalTime.patchValue(null, {
          emitEvent: false,
        });
      } else {
        this.cookingStepForm.controls.description.patchValue(null, {
          emitEvent: false,
        });
      }
    });
    this.cookingStepForm.valueChanges.subscribe((value) => {
      this.cookingStepChange.emit(value);
    });
  }
}
