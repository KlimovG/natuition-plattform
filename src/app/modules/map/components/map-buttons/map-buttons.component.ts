import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-map-buttons',
  template: `
    <ng-container *ngFor="let btn of buttons">
      <app-map-button
        [name]="btn.name"
        [active]="btn.active"
        (toggle)="toggleMap.emit($event)"
      >
      </app-map-button>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapButtonsComponent {
  @Input() isPath: boolean;
  @Input() isField: boolean;
  @Input() isExtracted: boolean;
  @Output() toggleMap = new EventEmitter<string>();
  get buttons(): Array<{ name: string; active: boolean }> {
    return [
      { name: 'path', active: this.isPath },
      { name: 'extracted', active: this.isExtracted },
      { name: 'field', active: this.isField },
    ];
  }
}
