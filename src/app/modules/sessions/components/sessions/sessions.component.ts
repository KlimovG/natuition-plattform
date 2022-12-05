import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';

@Component({
  selector: 'app-sessions',
  template: `
    <app-title-section title="sessions.title"> </app-title-section>
    <app-buttons-list
      class="overflow-y-scroll max-h-full block"
      [buttonsData]="sessions"
      [active]="activeSession"
      (onClick)="onSessionClick.emit($event)"
    >
    </app-buttons-list>
    <ng-content></ng-content>
  `,
})
export class SessionsComponent implements OnInit {
  @Input() sessions: IButtonsData[];
  @Input() activeSession: number;
  @Output() onSessionClick = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
}
