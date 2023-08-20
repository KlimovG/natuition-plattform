import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';

type ChartConfig = ChartConfiguration<'doughnut'>['data']['datasets'];

@Component({
  selector: 'app-type-plants',
  template: `
    <app-title-column [title]="translationPrefix + 'title'"></app-title-column>
    <div class="w-full relative flex justify-center" *ngIf="data?.length > 0">
      <canvas
        style="width: 100%; height: 186px;"
        class="max-w-stat-item w-full"
        baseChart
        [labels]="labels"
        [datasets]="dataset"
        [options]="options"
        [legend]="true"
        type="doughnut"
      ></canvas>
    </div>
  `,
})
export class TypePlantsComponent implements OnChanges {
  @Input() translationPrefix: string;
  @Input() labels: string[];
  @Input() data: number[];
  @Input() set isSmallScreen(value: boolean) {
    this.options.plugins.legend.position = value ? 'right' : 'bottom';
  }

  _dataset: ChartConfig = [];
  options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    radius: '40',
    maintainAspectRatio: false,
    aspectRatio: 1,
    cutout: 10,
    animation: false,
    plugins: {
      legend: {
        maxWidth: 200,
        labels: {
          boxWidth: 15,
          font: {
            family: 'Arial',
            size: 11,
          },
        },
      },
    },
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      const data: number[] = changes['data'].currentValue;
      this.dataset = [
        {
          data: data,
          label: 'Series A',
          backgroundColor: [
            'rgba(116, 224, 110, 0.7)',
            'rgba(191, 245, 188, 0.7)',
            'rgba(59, 171, 54, 0.7)',
            'rgba(126, 166, 124, 0.7)',
            'rgba(3, 43, 0, 0.7)',
          ],
          borderColor: [
            'rgba(116, 224, 110, 1)',
            'rgba(191, 245, 188, 1)',
            'rgba(59, 171, 54, 1)',
            'rgba(126, 166, 124, 1)',
            'rgba(3, 43, 0, 1)',
          ],
          borderWidth: 1,
        },
      ];
    }
  }
  set dataset(data) {
    this._dataset = data;
  }
  get dataset() {
    return this._dataset;
  }
}
