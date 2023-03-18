import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
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
];
@NgModule({
  declarations: [
    AppComponent,
    OverviewItemComponent,
    OverviewComponent,
    RecipeEditComponent,
    RecipeComponent,
    CookinStepDetailComponent,
  ],
  imports: [
    ...Material,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
