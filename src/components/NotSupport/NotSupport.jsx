import React from 'react';
import {getStyles} from './styles';
import {Text, View} from 'react-native';
import {useBunnyKit} from '../../hooks';

export const NotSupport = (props) => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const {text} = props;
    const styles = getStyles(sizeLabor, themeLabor);
    return (<View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </View>);
};
