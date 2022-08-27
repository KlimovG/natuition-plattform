import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LocationStrategy,
  PathLocationStrategy,
  Location,
} from '@angular/common';

@Component({
  selector: 'app-home-page',
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  get translationText(): string {
    if (this.location.path().includes('login')) return 'login';
    if (this.location.path().includes('registration')) return 'registration';
    return 'home';
  }

  get primaryLink(): [string] | null {
    return this.translationText === 'home' ? ['registration'] : null;
  }

  get secondaryLink(): [string] | null {
    return this.translationText === 'home' ? ['login'] : null;
  }

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    // this.mainPageSubscription.unsubscribe();
  }
}
