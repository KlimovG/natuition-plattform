import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-item',
  template: `
    <div class="flex justify-end gap-4 w-full HindMadurai-Light items-center">
      {{ label | translate }}
      <div
        class="border-green-dark border-2 rounded mr-0 py-2 px-2 min-w-50 text-center"
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
