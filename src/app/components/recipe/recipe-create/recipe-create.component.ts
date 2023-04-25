import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EntryType, IngridientEntry } from 'src/app/types/cooking-entry';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent {
  public formGroup: FormGroup<RecipeFormGroup>;

  public iconOptions: Array<string> = ['home'];

  constructor(
    formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<Partial<IngridientEntry>>
  ) {
    this.formGroup = formBuilder.group({
      entryType: [{ value: EntryType.ICON, disabled: true }],
      name: [null],
      previewData: [{ value: null, disabled: true }],
    });
  }

  public tryClose(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}

export type RecipeFormGroup = {
  name: FormControl<string>;
  entryType: FormControl<EntryType>;
  previewData: FormControl<string>;
};
