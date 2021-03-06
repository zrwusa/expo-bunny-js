import React from 'react';
import { makeStyles } from './styles';
import { IcoMoon } from '../UI';
import { useBunnyKit } from '../../hooks/bunny-kit';
export function LinearGradientIcon(props) {
    const { sizeLabor, themeLabor, wp } = useBunnyKit();
    const { name, size, colors } = props;
    const { theme } = themeLabor;
    const { designsBasedOn } = sizeLabor;
    const finalSize = size || wp(20), colorsDefault = [theme.colors.backgroundBtn, theme.colors.backgroundBtn2];
    const styles = makeStyles(sizeLabor, themeLabor);
    return (<IcoMoon name={name} size={finalSize} color={colors ? colors[0] : colorsDefault[0]}/>);
}
