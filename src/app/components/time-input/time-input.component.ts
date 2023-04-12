import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Time } from 'src/app/types/timer';
import { getTimeString } from 'src/app/utility/timer.utility';
import { enteredTimeValidator } from 'src/app/validators/time.validator';

@Component({
  selector: 'time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TimeInputComponent,
      multi: true,
    },
  ],
})

// TODO implement android like 3 slider input for time
export class TimeInputComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
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
      time: [null as string, enteredTimeValidator],
      timeEnabled: [true],
    });
  }
  public ngOnInit(): void {
    this.formGroup.controls['time'].valueChanges.subscribe((value) => {
      if (value) {
        this.value = new Time(value);
      }
      this.valueChange.emit(this.value);
      this.onChange(this.value);
      this.onTouched(this.value);
    });
    this.formGroup.controls['timeEnabled'].valueChanges.subscribe((value) => {
      if (value && this.formGroup.controls['time'].disabled) {
        this.formGroup.controls['time'].patchValue('00:00:00');
        this.formGroup.controls['time'].enable();
        this.formGroup.updateValueAndValidity();
      } else if (!value && !this.formGroup.controls['time'].disabled) {
        this.formGroup.controls['time'].patchValue(null);
        this.formGroup.controls['time'].disable();
        this.formGroup.updateValueAndValidity();
      }
    });
  }
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.setTimeValue(this.value);
    }
  }
  private setTimeValue(value: Time) {
    if (!value?._seconds) {
      this.formGroup.patchValue({
        timeEnabled: false,
      });
      console.warn('null value, setting null');
    }
    this.formGroup.patchValue({
      time: getTimeString(value),
    });
  }

  public writeValue(time: Time): void {
    this.value = time;
    this.setTimeValue(this.value);
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
