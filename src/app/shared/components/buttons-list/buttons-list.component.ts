import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export interface IButtonsData {
  label?: string;
  id?: number | string;
  subtitle?: string;
  date?: string;
  duration?: string;
  field?: string;
  extracted?: number;
}

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent {
  faHeart = faCoffee;

  @Input() buttonsData: IButtonsData[];
  @Input() active: string | number;
  @Output() onClick = new EventEmitter<any>();
}
