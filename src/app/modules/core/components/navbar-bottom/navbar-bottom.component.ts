import { Component } from '@angular/core';
import {
  faCarSide,
  faChartPie,
  faList,
  faMap,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-bottom',
  template: `
    <a
      *ngFor="let link of links; let i = index"
      class="w-1/4 flex items-center justify-center p-3 text-xl hover:bg-primary-light hover:text-primary-dark bg-white "
      routerLinkActive="bg-green text-white"
      [ngClass]="{ 'rounded-l-2xl': i === 0, 'rounded-r-2xl': i === 3 }"
      [routerLink]="link.link"
    >
      <fa-icon [icon]="link.icon" size="1x"></fa-icon>
    </a>
  `,
  host: {
    class: ' text-primary-dark',
  },
})
export class NavbarBottomComponent {
  robotIcon = faCarSide;
  mapIcon = faMap;
  chartIcon = faChartPie;
  sessionsIcon = faList;
  icons = [this.robotIcon, this.mapIcon, this.chartIcon, this.sessionsIcon];
  links = [
    {
      link: 'robots',
      icon: this.robotIcon,
    },
    {
      link: 'map',
      icon: this.mapIcon,
    },
    {
      link: 'statistic',
      icon: this.chartIcon,
    },

    {
      link: 'sessions',
      icon: this.sessionsIcon,
    },
  ];
}
