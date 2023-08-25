import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsListComponent {
  @Input() buttonsData: IButtonsData[];
  @Input() active: string | number;
  @Output() onClick = new EventEmitter<any>();

  trackById(index: number, button: any): string {
    return button.id;
  }
}
