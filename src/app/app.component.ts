import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './shared/i18n/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'natuition-plattform';

  constructor(
    private store: Store<State>,
    private translateService: TranslateService,
    private translationHandler: TranslationService
  ) {}

  ngOnInit() {
    this.translationHandler.init();
  }
}
