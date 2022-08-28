import * as fromReducer from './i18n.reducer';
import * as fromActions from './i18n.actions';

describe('i18n Reducer', () => {
  describe('undefined action', () => {
    it('Should return the default state', () => {
      const { initialState } = fromReducer;
      const action: fromActions.LanguageActionsUnion = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('UPDATE_LANGUAGE', () => {
    it('Should return the new state', () => {
      const state = fromReducer.reducer({ lang: 'de' }, new fromActions.UpdateLanguage('en'));

      expect(state.lang).toBe('en');
    });
  });
});
