import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic',
  template: `
    <app-title-section
      [title]="translationPrefix + 'title'"
    ></app-title-section>
    <div class="flex lg:flex-nowrap ">
      <div class="lg:w-1/2">
        <app-type-plants
          [translationPrefix]="translationPrefix + 'types.'"
        ></app-type-plants>
      </div>
      <div class="lg:w-1/2">
        <app-robot-stats
          [translationPrefix]="translationPrefix + 'stats.'"
        ></app-robot-stats>
      </div>
    </div>
  `,
})
export class StatisticComponent implements OnInit {
  @Input() translationPrefix: string;
  constructor() {}

  ngOnInit(): void {}
}
