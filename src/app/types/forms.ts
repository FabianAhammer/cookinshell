import { FormGroup, FormControl } from '@angular/forms';

export type TypedFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

// export class TypedFormGroup<T> extends FormGroup {
//   constructor(value: T) {
//     const controls = Object.keys(value).reduce((acc, key) => {
//       acc[key] = new FormControl(value[key]);
//       return acc;
//     }, {});
//     super(controls);
//   }
// }
