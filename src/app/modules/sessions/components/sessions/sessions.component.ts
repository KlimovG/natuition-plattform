import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sessions',
  template: `
    <div
      class="flex justify-between items-center pb-3 sticky top-0 bg-gray-white"
    >
      <app-title-section title="sessions.title"> </app-title-section>
    </div>

    <app-buttons-list
      class="overflow-y-scroll overflow-x-hidden max-h-full block"
      *ngIf="!isDataLoading"
      [buttonsData]="sessions"
      [active]="activeSession"
      (onClick)="onSessionClick.emit($event)"
    >
    </app-buttons-list>

    <app-spinner name="sessionList" size="large"></app-spinner>

    <div class="w-full pt-5 mt-auto">
      <app-button-main
        css="bg-primary-main text-white lg:hover:bg-white lg:hover:text-primary-main border border-primary-main"
        [fullWidth]="true"
        (click)="onMoreClick.emit($event)"
      >
        {{ 'sessions.more' | translate }}
        <fa-icon [icon]="icon" [fixedWidth]="true"></fa-icon>
      </app-button-main>
    </div>

    <ng-content></ng-content>
  `,
})
export class SessionsComponent {
  @Input() sessions: IButtonsData[];
  @Input() activeSession: string;
  @Input() set isDataLoading(value: boolean) {
    value ? this.spinner.show('sessionList') : this.spinner.hide('sessionList');
    this._isDataLoading = value;
  }
  @Output() onSessionClick = new EventEmitter<string>();
  @Output() onMoreClick = new EventEmitter<any>();
  icon = faDownload;
  _isDataLoading: boolean;

  get isDataLoading(): boolean {
    return this._isDataLoading;
  }

  constructor(private spinner: NgxSpinnerService) {}
}
