import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
})
export class AuthButtonsComponent {
  @Input() isLoading: boolean;
  @Input() formName: string;
  @Input() buttonDisabled: boolean;
  @Input() translationPrefix: string;
}
