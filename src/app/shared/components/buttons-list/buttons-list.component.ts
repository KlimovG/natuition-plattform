import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IButtonsData {
  label: string;
  id: number | string;
}

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent {
  @Input() buttonsData: IButtonsData[];
  @Input() active: string | number;
  @Output() onClick = new EventEmitter<any>();
}
