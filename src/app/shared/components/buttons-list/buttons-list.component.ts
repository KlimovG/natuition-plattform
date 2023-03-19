import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { RobotStatus } from '../../../modules/robots/models/robot.model';

export interface IButtonsData {
  label?: string;
  id?: number | string;
  subtitle?: string;
  date?: string;
  duration?: string;
  field?: string;
  extracted?: number;
  status?: RobotStatus;
}

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent {
  faHeart = faCross;

  @Input() buttonsData: IButtonsData[];
  @Input() active: string | number;
  @Output() onClick = new EventEmitter<any>();
}
