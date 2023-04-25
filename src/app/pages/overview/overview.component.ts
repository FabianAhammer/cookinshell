import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeCreateComponent } from 'src/app/components/recipe/recipe-create/recipe-create.component';
import { DataService } from 'src/app/services/data.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  constructor(public dialog: MatDialog, public dataService: DataService) {}

  public openCreateDialog() {
    this.dialog
      .open(RecipeCreateComponent)
      .afterClosed()
      .subscribe((data) => {
        if (!data) {
          return;
        }
        this.dataService.addRecipe({
          id: uuid.v4(),
          created: new Date(),
          entryType: data.entryType,
          name: data.name,
          previewData: data.previewData,
          ingredients: [],
          steps: [],
        });
      });
  }
}
