import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sessions',
  template: `
    <div class="flex justify-between items-center mb-2.5">
      <app-title-section title="sessions.title"> </app-title-section>

      <app-button-main
        css="bg-white hover:bg-green-dark hover:text-gray-white border border-green-dark"
        (click)="onMoreClick.emit()"
      >
        <fa-icon [icon]="icon"></fa-icon>
      </app-button-main>
    </div>

    <app-buttons-list
      class="overflow-y-scroll max-h-full block"
      *ngIf="!isLoading"
      [buttonsData]="sessions"
      [active]="activeSession"
      (onClick)="onSessionClick.emit($event)"
    >
    </app-buttons-list>

    <app-spinner
      name="sessionList"
      [showSpinner]="isLoading"
      size="large"
    ></app-spinner>

    <ng-content></ng-content>
  `,
})
export class SessionsComponent implements OnInit {
  @Input() sessions: IButtonsData[];
  @Input() activeSession: number;
  @Input() isLoading: boolean;
  @Output() onSessionClick = new EventEmitter<number>();
  @Output() onMoreClick = new EventEmitter<any>();
  constructor() {}
  icon = faPlus;

  ngOnInit(): void {}
}
