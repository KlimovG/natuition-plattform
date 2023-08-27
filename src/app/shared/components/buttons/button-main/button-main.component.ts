import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-main',
  templateUrl: './button-main.component.html',
  styleUrls: ['./button-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonMainComponent {
  @Input() routerLink: any[] | string | null | undefined;
  @Input() text: string;
  @Input() css: string;
  @Input() formName: string;
  @Input() disabled: boolean;
  @Input() fullWidth: boolean = false;
}
