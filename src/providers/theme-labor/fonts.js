import { Platform } from 'react-native';
import { EThemes } from '../../constants';
const fontConfig = {
    web: {
        regular: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '400',
        },
        medium: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '500',
        },
        light: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '300',
        },
        thin: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '100',
        },
    },
    ios: {
        regular: {
            fontFamily: 'System',
            fontWeight: '400',
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500',
        },
        light: {
            fontFamily: 'System',
            fontWeight: '300',
        },
        thin: {
            fontFamily: 'System',
            fontWeight: '100',
        },
    },
    default: {
        regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'sans-serif-light',
            fontWeight: 'normal',
        },
        thin: {
            fontFamily: 'sans-serif-thin',
            fontWeight: 'normal',
        },
    },
};
const getFontConfigLeavesWrappedWithThemeNames = () => {
    let configWithThemeName = {};
    // Todo as unknown as is not a safe method
    let fontConfigAlias = fontConfig;
    Object.keys(fontConfig).forEach(platformName => {
        configWithThemeName[platformName] = {};
        Object.keys(fontConfigAlias[platformName]).forEach(fontName => {
            configWithThemeName[platformName][fontName] = {};
            Object.keys(fontConfigAlias[platformName][fontName]).forEach(fontProperty => {
                configWithThemeName[platformName][fontName][fontProperty] = {};
                const themeKeys = Object.keys(EThemes);
                themeKeys.forEach((themeName) => {
                    configWithThemeName[platformName][fontName][fontProperty][EThemes[themeName]] = fontConfigAlias[platformName][fontName][fontProperty];
                });
            });
        });
    });
    return configWithThemeName;
};
export const configureFonts = (config) => {
    return Platform.select({ ...fontConfig, ...config });
};
export const fonts = configureFonts();
export const configureFontsWarehouse = (config) => {
    return Platform.select({ ...getFontConfigLeavesWrappedWithThemeNames(), ...config });
};
export const fontsWarehouse = configureFontsWarehouse();
