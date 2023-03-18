import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, OverviewItem } from '../../types/cooking-entry';
import { OverviewItemService } from './overview-item.service';

@Component({
  selector: 'overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.scss'],
  providers: [OverviewItemService],
})
export class OverviewItemComponent {
  @Input()
  public overviewItem: OverviewItem;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public openRecipe() {
    this.router.navigate([`recipe/${(this.overviewItem as Recipe).id}`]);
  }
}
