import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
        title: [null as string, [Validators.required]],
        totalTime: [null as Time],
        elapsedTime: [null as Time],
        completed: [false],
      })
    );
  }
  // Create ng on changes method adding data to the form group
  public override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes, CookinStepUtil.isOnlyIdSet);
  }

  public override setValueToFormGroup(value: CookingStep) {
    this.formGroup.patchValue({
      description: value?.description,
      title: value?.title,
      id: value?.id,
      totalTime: value?.totalTime,
      elapsedTime: value?.elapsedTime,
      completed: value?.completed,
    });
  }

  public get timerAvailable(): boolean {
    if (!this.value.elapsedTime) {
      return true;
    }
    if (this.value.totalTime._seconds <= this.value.elapsedTime._seconds) {
      return true;
    }
    return false;
  }

  public override edit() {
    this.resetStepTimer(this.value.id);
    super.edit();
  }

  public toggleTimer() {
    this.recipeService.toggleTimer(this.value.id);
  }

  public fastForwardStepTimer(id: string): void {
    this.recipeService.fastForwardStepTimer(id);
  }
  public resetStepTimer(id: string): void {
    this.recipeService.resetStepTimer(id);
  }

  public handleCompletedChange(completed: boolean) {
    this.formGroup.controls.completed.patchValue(completed, {
      emitEvent: false,
    });
    this.value = this.formGroup.value as CookingStep;
    this.valueChange.emit(this.value);
  }
}
