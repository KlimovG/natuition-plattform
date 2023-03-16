import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faCross,
  faSeedling,
  faSignal,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

export interface IButtonsData {
  label?: string;
  id?: number | string;
  subtitle?: string;
  date?: string;
  duration?: string;
  field?: string;
  extracted?: number;
  online$?: Observable<boolean>;
  active$?: Observable<boolean>;
}

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent {
  faHeart = faCross;
  faActive = faSignal;
  faOnline = faSeedling;

  @Input() buttonsData: IButtonsData[];
  @Input() active: string | number;
  @Output() onClick = new EventEmitter<any>();
}
