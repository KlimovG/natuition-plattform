import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
})
export class AuthButtonsComponent {
  @Input() formName!: string;
  @Input() translationPrefix!: string;
}
