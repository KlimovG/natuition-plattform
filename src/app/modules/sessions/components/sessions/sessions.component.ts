import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IButtonsData } from '../../../../shared/components/buttons-list/buttons-list.component';
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
      class="overflow-y-scroll overflow-x-hidden max-h-full block noselect"
      [buttonsData]="sessions"
      [active]="activeSession"
      (onClick)="onSessionClick.emit($event)"
    >
      <div *ngIf="sessions" class="w-full pt-5 mt-auto pr-2">
        <app-button-main
          style="overflow-anchor:none"
          css="bg-primary-main text-white lg:hover:bg-white lg:hover:text-primary-main border border-primary-main"
          [fullWidth]="true"
          (click)="onMoreClick.emit($event)"
        >
          {{ 'sessions.more' | translate }}
        </app-button-main>
      </div>
    </app-buttons-list>

    <app-spinner name="sessionList" size="large"></app-spinner>

    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  _isDataLoading: boolean;

  get isDataLoading(): boolean {
    return this._isDataLoading;
  }

  constructor(private spinner: NgxSpinnerService) {}
}
