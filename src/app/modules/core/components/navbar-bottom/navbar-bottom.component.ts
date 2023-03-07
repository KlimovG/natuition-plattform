import { Component } from '@angular/core';
import {
  faChartColumn,
  faListNumeric,
  faListSquares,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-bottom',
  template: `
    <a
      *ngFor="let link of links; let first = first; let last = last"
      class="w-1/3 flex items-center justify-center p-3 text-xl  bg-white relative"
      routerLinkActive="bg-green text-white"
      [ngClass]="{ 'rounded-l-2xl': first, 'rounded-r-2xl': last }"
      [routerLink]="link.link"
    >
      <span
        *ngIf="!first"
        class="bg-green absolute top-1/4 h-1/2 w-divider left-0 z-10"
      ></span>
      <fa-icon [icon]="link.icon" size="1x"></fa-icon>
      <span
        *ngIf="!last"
        class="bg-green absolute top-1/4 h-1/2 w-divider right-0 z-10"
      ></span>
    </a>
  `,
  host: {
    class: ' text-primary-dark',
  },
})
export class NavbarBottomComponent {
  robotIcon = faListNumeric;
  chartIcon = faChartColumn;
  sessionsIcon = faListSquares;
  links = [
    {
      link: 'robots',
      icon: this.robotIcon,
    },
    {
      link: 'report',
      icon: this.chartIcon,
    },

    {
      link: 'sessions',
      icon: this.sessionsIcon,
    },
  ];
}
