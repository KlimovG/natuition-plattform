import { Component } from '@angular/core';

@Component({
  selector: 'app-session-report',
  template: `
    <app-smart-map
      class="h-map-mobile grid grid-cols-1 grid-rows-column"
    ></app-smart-map>

    <app-smart-statistic class="h-auto mt-4 block "></app-smart-statistic>
  `,
  host: {
    class: 'py-4 px-6 w-full block bg-gray-white rounded-2xl',
  },
})
export class SessionReportComponent {}
