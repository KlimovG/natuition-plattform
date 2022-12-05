import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

type ChartConfig = ChartConfiguration<'doughnut'>['data']['datasets'];

@Component({
  selector: 'app-type-plants',
  template: `
    <app-title-column [title]="translationPrefix + 'title'"></app-title-column>
    <div class="w-full">
      <canvas
        class="w-full"
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
  _dataset: ChartConfig = [];
  options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 15,
    plugins: {
      legend: {
        position: 'right',
        maxWidth: 200,
        labels: {
          boxWidth: 20,
          font: {
            family: 'Hind Madurai',
            size: 12,
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
