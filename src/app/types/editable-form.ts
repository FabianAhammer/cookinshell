import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TypedFormGroup } from './forms';
import { CookinStepUtil } from '../utility/cooking-step.utility';

@Directive()
export abstract class BaseEditableComponent<T> implements OnChanges {
  public formGroup: TypedFormGroup<T>;

  @Input()
  public editMode: boolean = false;

  @Input()
  public value: T;

  @Output()
  public valueChange = new EventEmitter<T>();

  constructor(formGroup: TypedFormGroup<T>) {
    this.formGroup = formGroup;
  }
  public ngOnChanges(
    changes: SimpleChanges,
    setEditFunction?: (value: T) => boolean
  ) {
    if (changes['value'] && this.formGroup) {
      this.setValueToFormGroup(this.value);
      if (setEditFunction && setEditFunction(this.value)) {
        this.edit();
      }
    }
  }

  public deleteAction() {
    this.valueChange.emit(null);
  }

  public edit() {
    this.editMode = true;
  }

  public save() {
    this.editMode = false;
    this.value = this.formGroup.value as T;
    this.valueChange.emit(this.value);
  }

  public cancel() {
    this.editMode = false;
    this.setValueToFormGroup(this.value);
  }

  public setValueToFormGroup(value: T) {
    // @ts-ignore
    this.formGroup.patchValue(value);
  }
}
