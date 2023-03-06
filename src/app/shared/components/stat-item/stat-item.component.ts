import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-item',
  template: `
    <div class="flex justify-between w-full HindMadurai-Light items-center">
      {{ label | translate }}
      <div
        class="border-green-dark border-2 rounded mr-0 p-1 w-2/5 text-center"
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
