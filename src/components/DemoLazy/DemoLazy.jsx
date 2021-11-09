import React from 'react';
import { Text, View } from '../UI';
import { makeStyles } from './styles';
import { useBunnyKit } from '../../hooks/bunny-kit';
export const DemoLazy = (props) => {
    const { sizeLabor, themeLabor } = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);
    return (<View>
            <Text style={styles.text}>{props.title}</Text>
        </View>);
};
