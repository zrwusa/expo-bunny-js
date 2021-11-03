import * as React from 'react';
import i18next from './i18next';
const I18nLaborContext = React.createContext(i18next);
I18nLaborContext.displayName = 'I18nContext';
export { I18nLaborContext };
