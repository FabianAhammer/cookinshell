import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TypedFormGroup } from './forms';

@Directive()
export abstract class BaseEditableComponent<T> implements OnChanges {
  @Input()
  public editMode: boolean = false;
  public formGroup: TypedFormGroup<T>;

  @Input()
  public value: T;

  @Output()
  public valueChange = new EventEmitter<T>();

  constructor() {}
  public ngOnChanges(
    changes: SimpleChanges,
    setEditFunction?: (value: T) => boolean
  ) {
    if (changes['cookingStep']) {
      // @ts-ignore
      this.formGroup.patchValue(this.value);
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
    // @ts-ignore
    this.formGroup.patchValue(this.value);
  }
}
