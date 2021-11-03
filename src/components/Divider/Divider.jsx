import React from 'react';
import {View} from 'react-native';
import {getStyles} from './styles';
import {useBunnyKit} from '../../hooks';

export function Divider(props) {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const {isVertical, size, style} = props;
    const sizeVerticalMap = {
        xxs: wp(6),
        xs: wp(10),
        s: wp(14),
        m: wp(18),
        l: wp(22),
        xl: wp(30),
        xxl: wp(40)
    };
    const mergeStyleHorizontal = [
        styles.horizontal,
        style
    ];
    const mergeStyleVertical = [
        styles.vertical,
        style
    ];
    return isVertical
        ? <View style={[mergeStyleVertical, {height: size ? sizeVerticalMap[size] : wp(6)}]}/>
        : <View style={mergeStyleHorizontal}/>;
}
