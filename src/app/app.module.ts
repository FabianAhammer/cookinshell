import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewItemComponent } from './components/overview-item/overview-item.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CookinStepDetailComponent } from './components/cookin-step-detail/cookin-step-detail.component';
import { IngredientEntryDetailComponent } from './components/ingredient-entry-detail/ingredient-entry-detail.component';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { TimePipePipe } from './pipes/time-pipe.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TimeByNumberPipe } from './pipes/time-by-number.pipe.ts.pipe';
import { TimeDifferencePipe } from './pipes/time-difference.pipe';
import { NumberTimeDifferencePipe } from './pipes/number-time-difference.pipe';
const Material = [
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatCheckboxModule,
];
@NgModule({
  declarations: [
    AppComponent,
    OverviewItemComponent,
    OverviewComponent,
    RecipeEditComponent,
    RecipeComponent,
    CookinStepDetailComponent,
    IngredientEntryDetailComponent,
    TimeInputComponent,
    TimePipePipe,
    TimeByNumberPipe,
    TimeDifferencePipe,
    NumberTimeDifferencePipe,
  ],
  imports: [
    ...Material,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
