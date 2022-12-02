import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IButtonsData {
  label: string;
  id: string;
}

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent {
  @Input() buttonsData: IButtonsData[];
  @Input() active: string;
  @Output() onClick = new EventEmitter<any>();
}
