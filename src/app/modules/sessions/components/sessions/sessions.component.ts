import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sessions-list',
  template: `
    <app-section-title title="sessions.title"> </app-section-title>
    <app-buttons-list
      [buttonsData]="sessions"
      [active]="activeSession"
      (onClick)="onSessionClick.emit($event)"
    >
    </app-buttons-list>
    <ng-content></ng-content>
  `,
})
export class SessionsComponent implements OnInit {
  @Input() sessions: string[];
  @Input() activeSession: string;
  @Output() onSessionClick = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
