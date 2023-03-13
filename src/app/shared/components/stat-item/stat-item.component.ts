import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-item',
  template: `
    <div class="flex justify-end gap-4 w-full HindMadurai-Light items-center">
      <h4 class="w-2/5 text-right">{{ label | translate }}</h4>
      <div
        class="border-green-dark border-2 rounded mr-0 py-2 px-2 w-3/5 max-w-stat text-center"
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
