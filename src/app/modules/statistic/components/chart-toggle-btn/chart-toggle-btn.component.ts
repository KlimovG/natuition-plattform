import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chart-toggle-btn',
  template: `
    <button
      class="h-2 w-2 flex justify-center items-center rounded-lg border transition-colors"
      [ngClass]="{
        'bg-primary-main fill-white': active,
        'bg-white fill-primary-dark border-primary-dark': !active
      }"
      (click)="this.handleClick.emit(type)"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ChartToggleBtnComponent {
  @Input() type: 'pie' | 'line';
  @Input() active: boolean = true;
  @Output() handleClick = new EventEmitter<'pie' | 'line'>();
}
