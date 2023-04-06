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
    });
  }
  public ngOnInit(): void {
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
    if (!value) {
      this.formGroup.patchValue({
        time: null,
      });
    }
    if (typeof value === 'string') {
      this.formGroup.patchValue({
        time: value,
      });
    } else {
      this.formGroup.patchValue({
        time: getTimeString(value),
      });
    }
  }

  public writeValue(time: Time): void {
    this.value = time;
    this.setFgValue(this.value);
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
