import {useThemeLabor} from '../../providers';
import * as React from 'react';
import {EThemes} from '../../constants';
import {PickerSelect} from '../UI';

export const ThemePicker = ({...rest}) => {
    const themeLabor = useThemeLabor();
    const {changeTheme, currentThemeName} = themeLabor;
    const {theme} = themeLabor;
    const {colors} = theme;
    const themeLabels = Object.keys(EThemes).map((themeName) => {
        return {label: themeName, value: themeName, color: colors.text};
    });
    const handleValueChange = async (itemValue) => {
        console.log('---4?handleValueChange', itemValue);
        // todo always be invoked 4 times
        if (itemValue) {
            await changeTheme(itemValue);
        }
    };
    return <PickerSelect value={currentThemeName} placeholder={{label: 'Select ', value: '', color: colors.text}}
                         onValueChange={handleValueChange} items={themeLabels} {...rest}/>;
};
