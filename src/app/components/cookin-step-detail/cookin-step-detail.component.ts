import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookingStep } from 'src/app/types/cooking-entry';
import { TypedFormGroup } from 'src/app/types/forms';
import { CookinStepUtil } from 'src/app/utility/cooking-step.utility';
import * as uuid from 'uuid';

@Component({
  selector: 'cookin-step-detail',
  templateUrl: './cookin-step-detail.component.html',
  styleUrls: ['./cookin-step-detail.component.scss'],
})
export class CookinStepDetailComponent implements OnChanges {
  public editMode: boolean = false;
  public formGroup: TypedFormGroup<CookingStep>;

  @Input()
  public cookingStep: CookingStep;

  @Output()
  public cookingStepChange = new EventEmitter<CookingStep>();

  /**
   *
   */
  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      id: [uuid.v4()],
      description: [null as string],
      title: [null as string],
      totalTime: [null as string],
      elapsedTime: [null as string],
    });
  }
  // Create ng on changes method adding data to the form group
  public ngOnChanges(changes: SimpleChanges) {
    if (changes['cookingStep']) {
      this.formGroup.patchValue(this.cookingStep);
      if (CookinStepUtil.isOnlyIdSet(this.cookingStep)) {
        this.edit();
      }
    }
  }

  public deleteAction() {
    this.cookingStepChange.emit(null);
  }

  public edit() {
    this.editMode = true;
  }

  public save() {
    this.editMode = false;
    this.cookingStep = this.formGroup.value as CookingStep;
    this.cookingStepChange.emit(this.cookingStep);
  }

  public cancel() {
    this.editMode = false;
    this.formGroup.patchValue(this.cookingStep);
  }
}
