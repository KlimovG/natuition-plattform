import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
})
export class CoreComponent {
  @Input() isSmallScreen$: Observable<any>;
  @Input() isMediumScreen$: Observable<any>;
  @Input() isLargeScreen$: Observable<any>;
  @Input() addStyles: boolean;
}
