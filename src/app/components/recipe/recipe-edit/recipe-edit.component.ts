import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/types/cooking-entry';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent {
  @Input()
  public formGroup: FormGroup;

  @Input()
  public recipe: Recipe;

  @Output()
  public save: EventEmitter<any> = new EventEmitter();

  @Output()
  public cancel: EventEmitter<any> = new EventEmitter();
}
