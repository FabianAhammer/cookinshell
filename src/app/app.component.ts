import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public $backNavigation: Observable<boolean>;
  constructor(router: Router) {
    // Subscribe to the angular router and get the data from the current route

    this.$backNavigation = router.events.pipe(
      filter((event) => event instanceof RoutesRecognized),
      tap((event: RoutesRecognized) => {
        console.log(event.state.root.firstChild?.data?.['allowBackNavigation']);
      }),
      map((event: RoutesRecognized) => {
        return event.state.root.firstChild?.data?.['allowBackNavigation'];
      })
    );
  }

  public navigateBack() {
    window.history.back();
  }
}
