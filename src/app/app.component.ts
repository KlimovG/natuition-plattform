import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './shared/i18n/translation.service';
import { BehaviorSubject } from 'rxjs';
import { Authenticate } from './modules/auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'natuition-plattform';
  availHeight = new BehaviorSubject<number>(null);

  constructor(
    private store: Store<State>,
    private translateService: TranslateService,
    private translationHandler: TranslationService
  ) {}

  ngOnInit() {
    this.translationHandler.init();
    this.store.dispatch(new Authenticate());
    this.availHeight.next(window.innerHeight);

    window.addEventListener('resize', (event: UIEvent) => {
      const availHeight = (event.target as Window).screen.availHeight;
      this.availHeight.next(
        availHeight > window.innerHeight ? window.innerHeight : availHeight
      );
    });
  }
}
