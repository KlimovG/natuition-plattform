import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LocationStrategy,
  PathLocationStrategy,
  Location,
} from '@angular/common';

@Component({
  selector: 'app-main-page',
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  get translationText(): string {
    if (this.location.path().includes('login')) return 'login';
    if (this.location.path().includes('registration')) return 'registration';
    return 'main';
  }

  get primaryLink(): string | null {
    return this.translationText === 'main' ? 'registration' : null;
  }

  get secondaryLink(): string | null {
    return this.translationText === 'main' ? 'login' : null;
  }

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    // this.mainPageSubscription.unsubscribe();
  }
}
