import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipeResolver } from './services/recipe-resolver.service';

const routes: Routes = [
  {
    component: OverviewComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: RecipeComponent,
    path: 'recipe/:id',
    data: { allowBackNavigation: true },
    resolve: {
      id: RecipeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
