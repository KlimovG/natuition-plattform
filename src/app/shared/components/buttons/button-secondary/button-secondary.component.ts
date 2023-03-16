import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.scss'],
})
export class ButtonSecondaryComponent {
  @Input() text: string = 'Default Button';
  @Input() link!: any[] | string | null | undefined;
  @Input() fullWidth: boolean;
}
