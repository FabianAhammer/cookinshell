import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<string> {
  constructor() {}
  public resolve(route: ActivatedRouteSnapshot): string {
    return route.paramMap.get('id');
  }
}
