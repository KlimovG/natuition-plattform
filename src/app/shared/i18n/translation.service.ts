import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { State } from '../../state';
import { UpdateLanguage } from './state/i18n.actions';

@Injectable()
export class TranslationService {
  constructor(private store: Store<State>, private translate: TranslateService) {}

  /**
   * Sets the default language and change listener.
   */
  public init(): void {
    this.store.pipe(select(state => state.language.lang)).subscribe(language => this.translate.use(language));
  }

  /**
   * Triggers a language update action.
   */
  public changeLanguage(language: string): void {
    this.store.dispatch(new UpdateLanguage(language));
  }
}
