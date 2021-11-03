import {useSizeLabor, useThemeLabor} from '../../providers';
import {useTranslation} from 'react-i18next';
import {useAuthLabor} from '../../providers/auth-labor';

export const useBunnyKit = () => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const authLabor = useAuthLabor();
    const {wp, hp} = sizeLabor.designsBasedOn.iphoneX;
    const {ms} = sizeLabor;
    const {t, i18n} = useTranslation();
    const {language} = i18n;
    const {theme} = themeLabor;
    const {colors} = theme;
    const {authResult, authFunctions} = authLabor;
    const {user} = authResult;
    return {
        sizeLabor,
        themeLabor,
        authLabor,
        theme,
        wp,
        hp,
        ms,
        t,
        language,
        i18n,
        colors,
        user,
        authFunctions
    };
};
