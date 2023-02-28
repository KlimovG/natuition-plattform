import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
})
export class AuthButtonsComponent implements OnChanges {
  @Input() isLoading: boolean;
  @Input() formName: string;
  @Input() buttonDisabled: boolean;
  @Input() translationPrefix: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes AuthButtonsComponent', changes);
  }
}
