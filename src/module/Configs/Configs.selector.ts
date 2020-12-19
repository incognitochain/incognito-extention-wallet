import result from 'lodash/result';
import { createSelector } from 'reselect';
import { translateByLanguage } from 'src/i18n';
import { IRootState } from 'src/redux/interface';
import { IConfigsReducer } from './Configs.reducer';

export const configsSelector = createSelector(
  (state: IRootState) => state.configs,
  (configs: IConfigsReducer) => configs
);

export const translateSelector = createSelector(configsSelector, (configs) =>
  translateByLanguage(configs.language)
);

export const translateByFieldSelector = createSelector(
  configsSelector,
  (configs) => (field: string) => {
    const translate = translateByLanguage(configs.language);
    let ts: any = result(translate, field);
    return ts;
  }
);

export const themeSelector = createSelector(
  configsSelector,
  (configs) => configs.theme
);