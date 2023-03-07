import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sessions',
  template: `
    <div
      class="flex justify-between items-center pb-3 sticky top-0 bg-gray-white"
    >
      <app-title-section title="sessions.title"> </app-title-section>
    </div>

    <app-buttons-list
      class="overflow-y-scroll max-h-full block"
      *ngIf="!isLoading"
      [buttonsData]="sessions"
      [active]="activeSession"
      (onClick)="onSessionClick.emit($event)"
    >
    </app-buttons-list>
    <div class="w-full pt-5 ">
      <app-button-main
        css="bg-primary-main text-white lg:hover:bg-white lg:hover:text-primary-main border border-primary-main"
        [fullWidth]="true"
        (click)="onMoreClick.emit()"
      >
        {{ 'sessions.more' | translate }}
        <fa-icon [icon]="icon" [fixedWidth]="true"></fa-icon>
      </app-button-main>
    </div>
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
  @Input() activeSession: string;
  @Input() isLoading: boolean;
  @Output() onSessionClick = new EventEmitter<string>();
  @Output() onMoreClick = new EventEmitter<any>();
  constructor() {}
  icon = faDownload;

  ngOnInit(): void {}
}
