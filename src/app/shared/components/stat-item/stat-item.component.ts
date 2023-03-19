import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-item',
  template: `
    <div class="flex justify-end gap-4 w-full HindMadurai-Light items-center">
      <h4 class="w-1/4 lg:w-1/2  text-right">{{ label | translate }}</h4>
      <div
        class="border-gray-700 border-2 rounded mr-0 py-2 px-2 w-3/4 lg:w-1/2 max-w-stat text-center"
      >
        {{ value }}
      </div>
    </div>
  `,
})
export class StatItemComponent {
  @Input() label: string;
  @Input() value: string;
}
