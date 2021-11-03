import React from 'react';
import {Text, View} from '../UI';
import {getStyles} from './styles';
import {useBunnyKit} from '../../hooks';

export const DemoLazy = (props) => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    return (<View>
        <Text style={styles.text}>{props.title}</Text>
    </View>);
};
