import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-item',
  template: `
    <div class="flex justify-end gap-4 w-full HindMadurai-Light items-center">
      <h4 class=" lg:w-1/2  text-right noselect">{{ label | translate }}</h4>
      <div
        class="border-gray-700 border-2 rounded mr-0 py-2 px-2 lg:w-1/2 max-w-stat-box w-3/4 text-center "
      >
        {{ value ? value : '--:--' }}
      </div>
    </div>
  `,
  host: {
    class: 'max-w-stat-item mx-auto flex',
  },
})
export class StatItemComponent {
  @Input() label: string;
  @Input() value: string;
}
