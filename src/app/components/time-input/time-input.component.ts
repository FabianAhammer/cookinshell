import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { Time } from 'src/app/types/timer';

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
})
export class TimeInputComponent implements ControlValueAccessor, OnChanges {
  public formGroup: FormGroup;

  @Input()
  public value: Time;

  @Input()
  public valueChange = new EventEmitter<Time>();

  @Input()
  public label: string = 'UNSET_TIME_LABEL';
  @Input()
  public placeholder: string = 'UNSET_TIME_PLACEHOLDER';
  @Input()
  public name: string = 'UNSET_TIME_NAME';

  public disabled: boolean = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(fb: FormBuilder) {
    this.formGroup = fb.group({
      time: null as string,
    });
    this.formGroup.valueChanges.subscribe((value) => {
      this.value = new Time(value.time);
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.onTouched(this.value);
    });
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.setFgValue(this.value);
    }
  }
  private setFgValue(value: Time) {
    this.formGroup.patchValue({
      time: value.getTimeString(),
    });
  }

  writeValue(time: Time): void {
    this.value = time;
    this.setFgValue(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
