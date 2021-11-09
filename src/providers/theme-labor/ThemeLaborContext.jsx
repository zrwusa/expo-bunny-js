import * as React from 'react';
import { defaultTheme, themes } from './theme';
import { EThemes } from '../../constants';
export const ThemeLaborContext = React.createContext({
    theme: defaultTheme,
    currentThemeName: EThemes.light,
    themes: themes,
    changeTheme: (themeName) => {
    },
    sysColorSchemeName: 'light'
});
ThemeLaborContext.displayName = 'ThemeContext';
